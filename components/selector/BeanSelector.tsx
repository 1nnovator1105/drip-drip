import { ChevronDownIcon, Icon } from "@/components/ui/icon";

import {
  Select,
  SelectTrigger,
  SelectInput,
  SelectIcon,
  SelectPortal,
  SelectBackdrop,
  SelectDragIndicatorWrapper,
  SelectContent,
  SelectItem,
  SelectDragIndicator,
} from "@/components/ui/select";

import { Pressable } from "@/components/ui/pressable";
import { Modal } from "@/components/ui/modal";
import { Input, InputField } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import useMyDrip from "@/hooks/useMyDrip";
import { Bean } from "@/type/bean";
import { useEffect, useState } from "react";
import { Alert, Button, StyleSheet, Image } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

interface Props {
  selectedBeanName: string;
  setSelectedBeanName: (value: string) => void;
}

export default function BeanSelector({
  selectedBeanName,
  setSelectedBeanName,
}: Props) {
  const { getMyBeans } = useMyDrip();
  const [myBeanList, setMyBeanList] = useState<Bean[]>();

  useEffect(() => {
    if (myBeanList) {
      const selectedBean = myBeanList?.find(
        (value) => value.name === selectedBeanName
      );
      console.log(selectedBean);
    }
  }, [selectedBeanName]);

  const fetchData = async () => {
    const data = await getMyBeans();
    setMyBeanList(data ? JSON.parse(data) : []);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Select
      selectedValue={selectedBeanName}
      onValueChange={(value) => setSelectedBeanName(value)}
      onOpen={() => fetchData()}
    >
      <SelectTrigger variant="outline" size="lg">
        <SelectInput placeholder="Select option" />
        <Icon as={ChevronDownIcon} className="mr-3" />
      </SelectTrigger>
      <SelectPortal>
        <SelectBackdrop />
        <SelectContent>
          <SelectDragIndicatorWrapper>
            <SelectDragIndicator />
          </SelectDragIndicatorWrapper>
          {myBeanList?.map((value) => {
            return (
              <SelectItem
                key={value?.name}
                label={value?.name}
                value={value?.name}
              />
            );
          })}
        </SelectContent>
      </SelectPortal>
    </Select>
  );
}

const styles = StyleSheet.create({
  customComponentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  text: {
    marginBottom: 20,
  },
  fixToText: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tinyLogo: {
    width: 20,
    height: 20,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 20 / 2,
    borderWidth: 3,
    borderColor: "white",
  },
});
