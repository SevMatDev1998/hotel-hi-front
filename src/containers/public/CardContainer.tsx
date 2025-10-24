

interface ICardContainerProps {
  children?: React.ReactNode;
  className?: string;
}
const CardContainer: React.FC<ICardContainerProps> = ({ children, className }) => {
  return (
    <div className={`bg-white p-3 rounded-[1px] border border-solid border-ash-gray ${className ?? ''}`}>
      {children}
    </div>
  );
};

export default CardContainer;