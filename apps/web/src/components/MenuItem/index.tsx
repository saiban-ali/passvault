import { HStack, Icon, Menu, Text } from 'native-base';
import React from 'react';
import { MaterialIcons } from '../Icons';

type Props = {
  title: string;
  icon?: string;
  as?: any;
};
const MenuItem: React.FC<Props> = (props) => {
  const { title, icon, as } = props;

  return (
    <Menu.Item>
      <HStack space={2} alignItems="flex-start">
        {icon && (
          <Icon as={as || MaterialIcons} mt="-1px" size="md" name={icon} />
        )}
        <Text m="0">{title}</Text>
      </HStack>
    </Menu.Item>
  );
};

export default MenuItem;
