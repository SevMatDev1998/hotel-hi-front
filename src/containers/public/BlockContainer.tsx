

interface IBlockContainerProps {
  children?: React.ReactNode;
  shadow?: boolean;
  className?: string;
}
const BlockContainer: React.FC<IBlockContainerProps> = ({ children, shadow = true, className = '' }) => {
  return (
    <div className={`bg-white p-8 rounded-lg ${shadow ? 'shadow-block-shadow' : ''} ${className}`}>
      {children}
    </div>
  );
};

export default BlockContainer;