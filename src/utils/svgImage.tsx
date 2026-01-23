import { SvgXml } from 'react-native-svg';

import { home, gallery, share, profile, search } from '../resources/svg';
import { IconsType } from '../types/iconsType';

export const IMAGES = {
  home,
  gallery,
  share,
  profile,
  search,
};

type Props = {
  icon: IconsType;
  width?: number;
  height?: number;
  color?: string;
  style?: any;
};

const SvgImage = (props: Props) => {
  const { icon, width = 25, height = 25, color = '#9b9b9b' } = props;
  const image = IMAGES[icon];
  if (!image) {
    throw new Error(
      `${icon} svg is not added in IMAGES JSON in path > svgIcons/index.js. Please insert icon`,
    );
  }
  return <SvgXml xml={image} width={width} height={height} fill={color} />;
};

export default SvgImage;
