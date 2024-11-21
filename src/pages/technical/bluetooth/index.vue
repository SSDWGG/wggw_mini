<template>
  <myNavBar title="检测蓝牙" />
  <view>
    <button @click="initBluetooth">初始化蓝牙</button>
    <button @click="discoverDevices">搜索设备</button>
    <view v-if="devices.length > 0">
      <p>选择设备进行连接:</p>
      <view v-for="device in filteredDevices" :key="device.deviceId">
        <button @click="connectToDevice(device.deviceId)">{{ device.name || device.localName }}</button>
      </view>
    </view>
    <view v-if="connected">
      <textarea v-model="receivedData" readonly></textarea>
      <input v-model="sendData" placeholder="输入发送的数据" />
      <button @click="sendDataToDevice">发送数据</button>
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue';
import bluetooth from '@/utils/bluetooth';
import myNavBar from '@/components/my-nav-bar/index.vue';

export default defineComponent({
  components: {
    myNavBar
    },
  setup() {
    const devices = ref<any[]>([]);
    const connectedDeviceId = ref<string>('');
    const serviceId = ref<string>('');
    const characteristicId = ref<string>('');
    const receivedData = ref<string>('');
    const sendData = ref<string>('');
    const connected = ref<boolean>(false);

    const initBluetooth = async () => {
      try {
        await bluetooth.openBluetoothAdapter();
        console.log('蓝牙初始化成功');
        discoverDevices();
      } catch (err) {
        console.error('蓝牙初始化失败', err);
        if (err.errMsg === 'openBluetoothAdapter:fail already opened') {
          // 已初始化通过，直接进行搜索设备
          discoverDevices();
        }
      }
    };

    const discoverDevices = async () => {
      try {
        await bluetooth.startBluetoothDevicesDiscovery();
        console.log('开始搜索蓝牙设备');
        setTimeout(async () => {
          devices.value = await bluetooth.getBluetoothDevices();
          console.log('发现设备:', devices.value);
          await bluetooth.stopBluetoothDevicesDiscovery();
        }, 5000);
      } catch (err) {
        console.error('搜索设备失败', err);
      }
    };

    const connectToDevice = async (deviceId: string) => {
      try {
        await bluetooth.connectToDevice(deviceId);
        connectedDeviceId.value = deviceId;
        console.log('连接成功:', deviceId);

        const services = await bluetooth.getBLEDeviceServices(deviceId);
        console.log('设备服务:', services);
        if (services.length > 0) {
          serviceId.value = services[0].uuid;
          const characteristics = await bluetooth.getBLEDeviceCharacteristics(deviceId, serviceId.value);
          console.log('特征值:', characteristics);
          if (characteristics.length > 0) {
            characteristicId.value = characteristics[0].uuid;
            await bluetooth.notifyCharacteristicValueChange(deviceId, serviceId.value, characteristicId.value, true);
            wx.onBLECharacteristicValueChange((res) => {
              const value = new TextDecoder().decode(res.value);
              receivedData.value += value;
              console.log('收到数据:', value);
            });
            connected.value = true;
          }
        }
      } catch (err) {
        console.error('连接设备失败', err);
      }
    };

    const sendDataToDevice = async () => {
      try {
        const buffer = new TextEncoder().encode(sendData.value).buffer;
        await bluetooth.writeCharacteristicValue(connectedDeviceId.value, serviceId.value, characteristicId.value, buffer);
        console.log('发送数据成功:', sendData.value);
      } catch (err) {
        console.error('发送数据失败', err);
      }
    };

    // 过滤掉不可用的设备， name 未知或不支持的设备  未知设备
    const filteredDevices = computed(() => devices.value.filter((device) => !device.name.includes('未知设备')));

    onMounted(() => {
      initBluetooth();
    });

    return {
      devices,
      connectedDeviceId,
      receivedData,
      sendData,
      connected,
      filteredDevices,
      initBluetooth,
      discoverDevices,
      connectToDevice,
      sendDataToDevice,
    };
  }
});
</script>

<style scoped>
/* 你的样式 */
</style>
