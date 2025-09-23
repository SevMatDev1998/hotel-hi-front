

interface IBlockContainerProps {
  children?: React.ReactNode;
  shadow?: boolean;
}
const BlockContainer: React.FC<IBlockContainerProps> = ({ children, shadow = true }) => {
  return (
    <div className={`bg-white p-5 rounded-lg ${shadow ? 'shadow-block-shadow' : ''}`}>
      {children}
    </div>
  );
};

export default BlockContainer;