// @flow

import 'babel-polyfill';
import express from 'express';
import type { $Request } from 'express';

import compression from 'compression';
import favicon from 'serve-favicon';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { createStore, applyMiddleware } from 'redux';
import type { Store } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import responseTime from 'response-time';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

import batcher from './packages/redux-batcher';
import type { BatchedAction } from './packages/redux-batcher';

import type { State } from './types/state';
import type { LoginResponse } from './types/api';
import { selectLoggedInUserId } from './redux/actions';
import layout from './layout';
import App from './components/app';
import reducer from './redux/reducer';
import init from './init';
import { translateUrl, getTitle } from './router';
import serverApi from './api/server';
import bundles from './bundles.json';
import { HttpError, errorHandler, asyncCatch, throw404 } from './packages/http';
import {
  setAuthTokenCookieForUserId,
  readAuthTokenFromCookies,
  deleteAuthTokenFromCookies,
} from './packages/auth-token';
import requireHttps from './packages/require-https';
import defaultState from './redux/default-state';
import errorPage from './error';
import oldUrlMiddleware from './old-url-middleware';
import getUserById from './services/users/get-user-by-id';

init().then((stores) => {
  const app = express();

  const api = serverApi(stores);

  app.set('trust proxy', true);
  app.set('x-powered-by', false);
  app.use(responseTime());
  app.set('port', (process.env.PORT || 5000));
  app.use(compression());

  const env = process.env.NODE_ENV || 'development';
  if (env === 'production') {
    app.use(requireHttps);
  }

  app.use(cookieParser());

  app.use('/public', express.static(`${__dirname}/../public`, {
    maxAge: 1000 * 60 * 60 * 24 * 365, // one year
  }));
  app.use(favicon(`${__dirname}/../public/favicon.ico`));

  app.get('/api/search', asyncCatch(async (req: $Request, res) => {
    res.json(await api.fetchSearchResults(
      JSON.parse(req.query.opts),
      req.query.pos,
    ));
  }));
  app.get('/api/player', asyncCatch(async (req: $Request, res) => {
    res.json(await api.fetchPlayer(req.query.id));
  }));
  app.get('/api/multiple-players', asyncCatch(async (req: $Request, res) => {
    res.json(await api.fetchMultiplePlayers(JSON.parse(req.query.ids)));
  }));
  app.get('/api/comparisons', asyncCatch(async (req: $Request, res) => {
    res.json(await api.fetchComparisons(req.query.id, req.query.pos));
  }));
  app.get('/api/multiple-percentiles', asyncCatch(async (req: $Request, res) => {
    res.json(await api.fetchMultiplePercentiles(JSON.parse(req.query.ids), req.query.pos));
  }));
  app.get('/api/typeahead', asyncCatch(async (req: $Request, res) => {
    res.json(await api.fetchTypeAheadResults(req.query.search));
  }));
  app.get('/api/stats', asyncCatch(async (req: $Request, res) => {
    res.json(await api.fetchDistributionStats(req.query.pos));
  }));
  app.get('/api/does-user-exist', asyncCatch(async (req: $Request, res) => {
    res.json(await api.doesUserExist(req.query.email));
  }));
  app.get('/api/get-user-permissions', asyncCatch(async (req: $Request, res) => {
    res.json(await api.getUserPermissions(req.query.id));
  }));
  app.get('/api/logout', asyncCatch(async (req: $Request, res) => {
    deleteAuthTokenFromCookies(res);
    res.json(await api.logout());
  }));

  app.get('/api/get-schools', asyncCatch(async (req: $Request, res) => {
    res.json(await api.getSchools());
  }));

  app.use(bodyParser.json());
  app.post('/api/login', asyncCatch(async (req: $Request, res) => {
    if (!req.body
      || typeof req.body.email !== 'string'
      || typeof req.body.password !== 'string'
    ) {
      throw new HttpError(400, '/api/login requires a email and password');
    }
    const result: LoginResponse = await api.loginUser(req.body.email, req.body.password);
    if (result.success) {
      setAuthTokenCookieForUserId(res, result.userId);
    }
    res.json(result);
  }));

  app.post('/api/create-user', asyncCatch(async (req: $Request, res) => {
    if (!req.body
      || typeof req.body.email !== 'string'
      || typeof req.body.password !== 'string'
    ) {
      throw new HttpError(400, '/api/createUser requires a email and password');
    }

    const result: LoginResponse = await api.createUser(req.body.email, req.body.password);
    if (result.success) {
      setAuthTokenCookieForUserId(res, result.userId);
    }
    res.json(result);
  }));

  app.post('/api/add-player', asyncCatch(async (req: $Request, res) => {
    if (!req.body
      || typeof req.body.firstName !== 'string'
      || typeof req.body.lastName !== 'string'
      || typeof req.body.draftYear !== 'number'
      || typeof req.body.schoolKey !== 'number'
      || (typeof req.body.newSchoolName !== 'string' && req.body.newSchoolName !== null)
    ) {
      throw new HttpError(400, '/api/addPlayer requires a complete player');
    }
    const details = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      draftYear: req.body.draftYear,
      schoolKey: req.body.schoolKey,
      newSchoolName: req.body.newSchoolName,
    };

    const userId = readAuthTokenFromCookies(req);
    if (!userId || userId < 0) {
      throw new HttpError(403, 'Forbidden');
    }

    const user = await getUserById(userId);
    if (!user || user.status < 2) {
      throw new HttpError(403, 'Forbidden');
    }

    res.json(await api.addPlayer(details));
  }));

  app.use(oldUrlMiddleware);

  app.get('*', asyncCatch(async (req: $Request, res) => {
    const store: Store<State, BatchedAction> = createStore(
      reducer,
      defaultState(stores.positionEligibilityStore),
      applyMiddleware(batcher, thunk.withExtraArgument(api)),
    );

    await store.dispatch(selectLoggedInUserId(readAuthTokenFromCookies(req)));
    await store.dispatch(translateUrl(req.path, req.query) || throw404(req.path));

    const jsBundleName: string = bundles.js_bundle_name || 'public/bundle.js';
    const cssBundleName: string = bundles.css_bundle_name || 'public/bundle.css';
    res.send(
      layout(
        getTitle(store.getState()),
        renderToString(<Provider store={store}><App /></Provider>),
        store.getState(),
        jsBundleName,
        cssBundleName,
      ),
    );
  }));

  app.use(errorHandler(errorPage));

  const port = app.get('port').toString();
  app.listen(port, () => { console.log(`MockDraftable now listening on ${port}`); });
});

