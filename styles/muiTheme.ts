import { Theme } from "@interface/utils/constantsInterface";
import { createTheme } from "@mui/material/styles";

const iPhoneInputFix = {
  styleOverrides: {
    root: {
      "*": {
        // to prevent mui input not working on iPhone
        WebkitUserSelect: "text !important" /* Chrome, Opera, Safari */,
        MozUserSelect: "text !important" /* Firefox 2+ */,
        MsUserSelect: "text !important" /* IE 10+ */,
        userSelect: "text !important" /* Standard syntax */,
      },
    },
  },
};

const inititalTheme = createTheme({});

const muiTheme = (theme: Theme) => {
  // const color = theme === "light" ? "#424242" : "#fffffa";
  // const background = theme === "light" ? "#fffffa" : "#14141e";

  return createTheme({
    typography: {
      fontFamily: '"Merienda", "Roboto Slab", serif',
      // allVariants: { color }
    },

    palette: {
      mode: theme,
      primary: { main: "rgb(68, 139, 68)" },
      secondary: { main: "rgb(141, 202, 141)" },
    },

    components: {
      MuiInput: iPhoneInputFix,
      MuiTextField: iPhoneInputFix,
      MuiFilledInput: iPhoneInputFix,
      MuiOutlinedInput: iPhoneInputFix,
      MuiFormControl: iPhoneInputFix,

      MuiTypography: { styleOverrides: { root: { lineHeight: "1.7em", letterSpacing: "0.01em" } } },

      MuiPaper: {
        styleOverrides: {
          root: {
            padding: 5,
            boxSizing: "border-box",

            // color, background
          },
        },
      },

      MuiTable: { styleOverrides: { root: { minWidth: 300 } } },

      MuiTableCell: {
        styleOverrides: { head: { backgroundColor: inititalTheme.palette.common.black, color: inititalTheme.palette.common.white }, body: { fontSize: 14 } },
      },

      MuiButton: {
        styleOverrides: {
          root: {
            fontWeight: "900",
            letterSpacing: ".2em",
            // color
          },
        },
      },

      MuiTableRow: {
        styleOverrides: {
          root: {
            "&:nth-of-type(odd)": { backgroundColor: inititalTheme.palette.action.hover },
            "&:last-child td, &:last-child th": { border: 0 }, // <= hide last border
          },
        },
      },
    },
  });
};
export default muiTheme;