const card_Container = {
  width: "100%",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill,  minmax(18rem,1fr))",
  gridGap: " 1rem",
};
const card_Box = {
  width: "100%",
  overflowY: " scroll",
  height: "50vh",
  boxShadow: " rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
};

module.exports = { card_Box, card_Container };
