import { Component } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';
import { GoodList } from './GoodList';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

enum SortType {
  NONE,
  ALPHABET,
  LENGTH,
}

interface ReorderOptions {
  sortType: SortType,
  isReversed: boolean,
}

export function getReorderedGoods(
  goods: string[],
  { sortType, isReversed }: ReorderOptions,
) {
  const visibleGoods = [...goods];

  visibleGoods.sort((a1, a2) => {
    switch (sortType) {
      case SortType.ALPHABET:
        return a1.localeCompare(a2);
      case SortType.LENGTH:
        return a1.length - a2.length;
      default:
        return 0;
    }
  });

  return isReversed
    ? visibleGoods.reverse()
    : visibleGoods;
}

interface State {
  isReversed: boolean,
  sortType: SortType,
}

export class App extends Component<{}, State> {
  state: State = {
    isReversed: false,
    sortType: SortType.NONE,
  };

  reverseHandler = () => {
    this.setState((state) => ({
      isReversed: !state.isReversed,
    }));
  };

  sortByAlphabet = () => {
    this.setState({ sortType: SortType.ALPHABET });
  };

  sortByLength = () => {
    this.setState({ sortType: SortType.LENGTH });
  };

  resetHandler = () => {
    this.setState({
      sortType: SortType.NONE,
      isReversed: false,
    });
  };

  render() {
    const {
      isReversed,
      sortType,
    } = this.state;

    const rowGoods = getReorderedGoods(goodsFromServer,
      this.state);

    return (
      <div className="section content">
        <div className="buttons">
          <button
            type="button"
            className={
              cn('button is-info',
                { 'is-light': sortType !== SortType.ALPHABET })
            }
            onClick={this.sortByAlphabet}
          >
            Sort alphabetically
          </button>

          <button
            type="button"
            className={cn('button is-success',
              { 'is-light': sortType !== SortType.LENGTH })}
            onClick={this.sortByLength}
          >
            Sort by length
          </button>

          <button
            type="button"
            className={cn('button is-warning',
              { 'is-light': !isReversed })}
            onClick={this.reverseHandler}
          >
            Reverse
          </button>

          {(sortType || isReversed) && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={this.resetHandler}
            >
              Reset
            </button>
          )}
        </div>

        <GoodList rowGoods={rowGoods} />
      </div>
    );
  }
}
