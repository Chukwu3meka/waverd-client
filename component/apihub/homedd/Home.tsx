import { styles } from ".";
import Link from "next/link";
import Image from "next/image";

import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { Intro, Support, Solutions, SearchPlayer } from ".";

const NoAuthHome = () => (
  <div className={styles.apihub}>
    {/* <Intro />
    <Solutions /> */}
    {/* <SearchPlayer
      searching={searching}
      playerDetails={playerDetails}
      playerSearchInputAutoComplete={playerSearchInputAutoComplete}
      playerSearchOptions={playerSearchOptions}
      setSearchTermHandler={setSearchTermHandler}
    /> */}
    <Support />
  </div>
);

export default NoAuthHome;