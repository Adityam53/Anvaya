const Heading = ({ name, tag }) => {
  const Tag = tag;
  return (
    <>
      <div className="heading">
        <Tag>{name}</Tag>
      </div>
    </>
  );
};

export default Heading;
