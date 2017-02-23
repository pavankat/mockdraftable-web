// @flow

import type { State } from './types/state';
import type { Action } from './actions';
import * as actions from './actions';

export default (previousState: State, action: Action): State => {
  if (action.type === actions.LOAD_PLAYER) {
    return Object.assign(
      {},
      previousState,
      { players: Object.assign({}, previousState.players, { [action.player.id]: action.player }) },
    );
  }
  if (action.type === actions.LOAD_COMPARISONS) {
    return Object.assign(
      {},
      previousState,
      {
        comparisons: Object.assign({}, previousState.comparisons, {
          [action.playerId]: Object.assign({}, previousState.comparisons[action.playerId], {
            [action.positionId]: action.comparisons,
          }),
        }),
      },
    );
  }
  if (action.type === actions.LOAD_PERCENTILES) {
    return Object.assign(
      {},
      previousState,
      {
        percentiles: Object.assign({}, previousState.percentiles, {
          [action.playerId]: Object.assign({}, previousState.percentiles[action.playerId], {
            [action.positionId]: action.percentiles,
          }),
        }),
      },
    );
  }
  if (action.type === actions.UPDATE_SELECTED_PLAYER) {
    return Object.assign({}, previousState, { selectedPlayerId: action.playerId });
  }
  if (action.type === actions.UPDATE_SELECTED_POSITION) {
    return Object.assign({}, previousState, { selectedPositionId: action.positionId });
  }
  if (action.type === actions.UPDATE_SEARCH_OPTIONS) {
    return Object.assign({}, previousState, { searchOptions: action.options });
  }
  if (action.type === actions.UPDATE_SEARCH_RESULTS) {
    return Object.assign({}, previousState, { searchResults: action.results });
  }
  if (action.type === actions.UPDATE_IS_SEARCHING) {
    if (action.isSearching) {
      return Object.assign({}, previousState, {
        isSearching: true,
        searchResults: {
          hasNextPage: false,
          players: [],
        },
      });
    }
    return Object.assign({}, previousState, {
      isSearching: false,
    });
  }
  if (action.type === actions.UPDATE_MODAL_TYPE) {
    return Object.assign({}, previousState, { modalType: action.modalType });
  }
  return previousState;
};
