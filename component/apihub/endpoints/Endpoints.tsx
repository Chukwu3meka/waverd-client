import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import GroupsIcon from "@mui/icons-material/Groups";
import SettingsAccessibilityIcon from "@mui/icons-material/SettingsAccessibility";
import FlagIcon from "@mui/icons-material/Flag";
import PublicIcon from "@mui/icons-material/Public";
import { connector, ConnectorProps } from "@store";
import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { MobileContainer, styles, NavContainer, EndpointContainer } from ".";

export default connector((props: ConnectorProps) => {
  const [mobile, setMobile] = useState(false);
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  useEffect(() => {
    setMobile(props.layout.width <= 620);
  }, [props.layout.width]);

  return mobile ? (
    <>
      <MobileContainer />
      <EndpointContainer />
    </>
  ) : (
    <main className={styles.endpoints}>
      <Grid container spacing={3}>
        <Grid item sm={3}>
          <NavContainer />
        </Grid>
        <Grid item sm={9}>
          <EndpointContainer />
        </Grid>
      </Grid>
    </main>
  );
});