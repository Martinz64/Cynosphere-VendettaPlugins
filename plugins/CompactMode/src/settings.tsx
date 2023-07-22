import {storage} from "@vendetta/plugin";
import {useProxy} from "@vendetta/storage";
import {General} from "@vendetta/ui/components";
import {findByProps} from "@vendetta/metro";
import {React, ReactNative} from "@vendetta/metro/common";
import {getAssetIDByName} from "@vendetta/ui/assets";

const {ScrollView} = General;
const {TableRowGroup, TableSwitchRow, TableRowIcon} =
  findByProps("TableRowGroup");

export default function CompactModeSettings() {
  useProxy(storage);

  const IconAvatar = (
    <TableRowIcon
      source={getAssetIDByName("ic_my_account_24px")}
      variant="blurple"
    />
  );
  const IconInline = (
    <TableRowIcon
      source={getAssetIDByName("ic_clear_all_24px")}
      variant="blurple"
    />
  );
  const IconClock = (
    <TableRowIcon source={getAssetIDByName("clock")} variant="blurple" />
  );

  return (
    <ScrollView style={{flex: 1}}>
      <TableRowGroup>
        <TableSwitchRow
          label="Show Avatars"
          subLabel="Only works on iOS due to Android regrabbing emote URLs."
          icon={IconAvatar}
          disabled={ReactNative.Platform.OS == "android"}
          value={storage.avatars ?? false}
          onValueChange={(value: boolean) => (storage.avatars = value)}
        />
        <TableSwitchRow
          label="No Inline Header"
          subLabel="Puts header on a new line."
          icon={IconInline}
          value={storage.noInline ?? false}
          onValueChange={(value: boolean) => (storage.noInline = value)}
        />
        <TableSwitchRow
          label="Full Inline Timestamps"
          subLabel="Shows un-truncated inline timestamps. Supports Custom Timestamps."
          icon={IconClock}
          value={storage.inlineTimestamps ?? false}
          onValueChange={(value: boolean) => (storage.inlineTimestamps = value)}
        />
      </TableRowGroup>
    </ScrollView>
  );
}