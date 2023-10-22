
type MyComponentProps = {
  htmlDoc?: Element | null;
};

function MyComponent({ htmlDoc }: MyComponentProps) {
  console.log(htmlDoc)
  return (
    <>
      {htmlDoc && (
        <div className="text-white" dangerouslySetInnerHTML={{ __html: new XMLSerializer().serializeToString(htmlDoc) }} />
      )}
    </>
  );
}

export default MyComponent;