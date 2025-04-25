export const getSelectedBtnProps = (isSelected) =>
    isSelected
      ? {
          colorScheme: "blue",
          variant: "solid",
        }
      : { color: "#444" };
  