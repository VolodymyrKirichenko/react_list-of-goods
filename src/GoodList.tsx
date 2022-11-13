import { FC } from 'react';

interface Props {
  rowGoods: string[];
}

export const GoodList: FC<Props> = (props) => {
  const { rowGoods } = props;

  return (
    <ul>
      {rowGoods.map(good => {
        return (
          <li
            data-cy="Good"
            key={good}
            className="box column is-info is-rounded mb-3"
          >
            {good}
          </li>
        );
      })}
    </ul>
  );
};
