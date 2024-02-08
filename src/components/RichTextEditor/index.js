import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import the CSS for ReactQuill
import PropTypes from "prop-types";
// Custom Quill component that accepts a 'name' prop
function CustomQuill({ name, value, onChange, theme = "snow" }) {
  const handleChange = (content, delta, source, editor) => {
    // Call the passed-in onChange function with an additional 'name' parameter
    onChange(name, content);
  };
  const modules = {
    toolbar: [
      [{ header: [2, false] }],
      ["bold", "italic"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
    ],
  };
  const props = {
    theme,
    onChange: handleChange,
    modules,
    style: { backgroundColor: "white" },
  };
  if (value) {
    props.value = value;
  }

  return <ReactQuill {...props} />;
}
CustomQuill.propTypes = {
  name: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  theme: PropTypes.string,
};
export default CustomQuill;
