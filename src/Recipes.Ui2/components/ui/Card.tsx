// @ts-ignore
import classNames from 'classnames';

function Card({ children, className, ...props }: any) {
  return (
      <div {...props} className={classNames('max-w-xl', className)}>
      <div className="bg-white shadow-md rounded-xl h-full dark:bg-slate-800">{children}</div>
  </div>
  )
}

export default Card;

