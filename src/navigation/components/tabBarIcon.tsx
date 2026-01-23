import React from 'react';
import { IconsType } from '../../types/iconsType';
import SvgImage from '../../utils/svgImage';

type Props = {
  routeName: string;
};

export function TabBarIcon({ routeName }: Props) {
  let iconName: IconsType = 'home';

  switch (routeName) {
    case 'Home':
      iconName = 'home';
      break;
    case 'Profile':
      iconName = 'profile';
      break;
    case 'Share':
      iconName = 'share';
      break;
    case 'Gallery':
      iconName = 'gallery';
      break;
  }

  return <SvgImage icon={iconName} width={20} height={20} color={'white'} />;
}
