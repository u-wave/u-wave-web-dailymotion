import cx from 'classnames';
import * as React from 'react';
import Dailymotion from 'react-dailymotion';
import muiThemeable from 'material-ui/styles/muiThemeable';

import VideoBackdrop from 'u-wave-web/components/Video/VideoBackdrop';

const DailymotionPlayer = ({
  muiTheme,
  active,
  className,
  enabled,
  mode,
  media,
  seek,
  volume,
}) => {
  const modeClass = `src-dailymotion-Player--${mode}`;

  let backdrop;
  if (active && mode !== 'large') {
    backdrop = <VideoBackdrop url={media.thumbnail} />;
  }
  // Wrapper span so the backdrop can be full-size…
  return (
    <span hidden={!active}>
      {backdrop}
      <div className={cx('src-dailymotion-Player', modeClass, className)}>
        {enabled && <Dailymotion
          video={media ? media.sourceID : null}
          width="100%"
          height="100%"
          autoplay
          start={Math.round(seek)}
          volume={volume / 100}
          sharing={false}
          uiShowStartScreenInfo={false}
          uiShowLogo={false}
          showEndScreen={false}
          uiHighlightColor={muiTheme.palette.primary1Color}
          controls={mode === 'preview'}
        />}
      </div>
    </span>
  );
};

DailymotionPlayer.propTypes = {
  muiTheme: React.PropTypes.object.isRequired,
  className: React.PropTypes.string,
  mode: React.PropTypes.oneOf(['small', 'large', 'preview']),
  active: React.PropTypes.bool.isRequired,
  enabled: React.PropTypes.bool,
  media: React.PropTypes.object,
  seek: React.PropTypes.number,
  volume: React.PropTypes.number,
};

export default muiThemeable()(DailymotionPlayer);
