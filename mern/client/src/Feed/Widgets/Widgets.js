import React from "react";
import "./Widgets.css";
import { TwitterTimelineEmbed, TwitterShareButton, TwitterTweetEmbed } from "react-twitter-embed";
import SearchIcon from "@material-ui/icons/Search";
function Widgets() {
  return (
    <div className="widgets">
      <div class="widgets__widgetContainer">
        <h2 className="widgets__header">What's happening</h2>
        <TwitterTweetEmbed tweetId={"933354946111705097"} />

        <TwitterTimelineEmbed
          sourceType="profile"
          screenName="elonmusk"
          options={{ height: 400 }}
        />

        <TwitterShareButton
          className="twitter_shareButton"
          url={"https://www.facebook.com/"}
          options={{ text: "#reactjs is awesome", via: "Denismade" }}
        />
      </div>
    </div>
  );
}

export default Widgets;
