export const customStyles = {
  control: (baseStyles) => ({
    ...baseStyles,
    fontWeight: 500,
    minWidth: "124px",
    padding: "6px 8px",
    borderRadius: "12px",
    border: "none",
    borderColor: "transparent",
    boxShadow: "none",
    backgroundColor: "var(--white)",
    outline: "none",
  }),
  indicatorSeparator: (base) => ({
    ...base,
    display: "none",
  }),
  dropdownIndicator: (base, { selectProps }) => ({
    ...base,
    transform: selectProps.menuIsOpen ? "rotate(180deg)" : "rotate(0deg)",
    transition: "transform 0.2s ease",
  }),
  placeholder: (base) => ({
    ...base,
    color: "var(--main)",
    fontWeight: 500,
  }),
  menu: (base) => ({
    ...base,
    maxWidth: "222px",
    backgroundColor: "var(--white)",
    borderRadius: "12px",
    border: "none",
    color: "var(--main)",
    overflow: "hidden",
    zIndex: 15,
    padding: "14px 8px",
  }),
  option: (base, { isSelected }) => ({
    ...base,
    fontWeight: 500,
    color: isSelected ? "var(--main)" : "rgba(18, 20, 23, 0.2)",
    cursor: "pointer",
  }),

  menuList: (base) => ({
    ...base,
    fontWeight: 500,
    maxHeight: "272px",
    "::-webkit-scrollbar": {
      width: "8px",
      height: "128px",
    },
    "::-webkit-scrollbar-track": {
      background: "transparent",
      paddingLeft: "8px",
    },
    "::-webkit-scrollbar-thumb": {
      backgroundColor: "var(--gray)",
      borderRadius: "10px",
    },
    "::-webkit-scrollbar-thumb:hover": {
      background: "var(--gray)",
    },
  }),
};

export const theme = (theme) => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary25: "var(--white)",
    primary50: "var(--gray)",
    primary: "var(--white)",
  },
});
