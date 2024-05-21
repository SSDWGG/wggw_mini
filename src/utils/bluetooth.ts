/// <reference types="wechat-miniprogram" />

interface BluetoothAdapterState {
  available: boolean;
  discovering: boolean;
}

interface BluetoothDevice {
  name: string;
  deviceId: string;
  RSSI: number;
  advertisData: ArrayBuffer;
  advertisServiceUUIDs: string[];
  localName: string;
  serviceData: { [key: string]: ArrayBuffer };
}

interface BLEConnectionResponse {
  errCode: number;
  errMsg: string;
}

interface BLEService {
  uuid: string;
  isPrimary: boolean;
}

interface BLECharacteristic {
  uuid: string;
  properties: {
    read: boolean;
    write: boolean;
    notify: boolean;
    indicate: boolean;
  };
}

export default {
  async openBluetoothAdapter(): Promise<WechatMiniprogram.GeneralCallbackResult> {
    return new Promise((resolve, reject) => {
      wx.openBluetoothAdapter({
        success: (res) => {
          resolve(res);
        },
        fail: (err) => {
          reject(err);
        },
      });
    });
  },

  async getBluetoothAdapterState(): Promise<BluetoothAdapterState> {
    return new Promise((resolve, reject) => {
      wx.getBluetoothAdapterState({
        success: (res) => {
          resolve(res);
        },
        fail: (err) => {
          reject(err);
        },
      });
    });
  },

  async startBluetoothDevicesDiscovery(): Promise<WechatMiniprogram.GeneralCallbackResult> {
    return new Promise((resolve, reject) => {
      wx.startBluetoothDevicesDiscovery({
        allowDuplicatesKey: false,
        success: (res) => {
          resolve(res);
        },
        fail: (err) => {
          reject(err);
        },
      });
    });
  },

  async stopBluetoothDevicesDiscovery(): Promise<WechatMiniprogram.GeneralCallbackResult> {
    return new Promise((resolve, reject) => {
      wx.stopBluetoothDevicesDiscovery({
        success: (res) => {
          resolve(res);
        },
        fail: (err) => {
          reject(err);
        },
      });
    });
  },

  async getBluetoothDevices(): Promise<BluetoothDevice[]> {
    return new Promise((resolve, reject) => {
      wx.getBluetoothDevices({
        success: (res) => {
          resolve(res.devices);
        },
        fail: (err) => {
          reject(err);
        },
      });
    });
  },

  async connectToDevice(deviceId: string): Promise<BLEConnectionResponse> {
    return new Promise((resolve, reject) => {
      wx.createBLEConnection({
        deviceId,
        success: (res) => {
          resolve(res);
        },
        fail: (err) => {
          reject(err);
        },
      });
    });
  },

  async getBLEDeviceServices(deviceId: string): Promise<BLEService[]> {
    return new Promise((resolve, reject) => {
      wx.getBLEDeviceServices({
        deviceId,
        success: (res) => {
          resolve(res.services);
        },
        fail: (err) => {
          reject(err);
        },
      });
    });
  },

  async getBLEDeviceCharacteristics(deviceId: string, serviceId: string): Promise<BLECharacteristic[]> {
    return new Promise((resolve, reject) => {
      wx.getBLEDeviceCharacteristics({
        deviceId,
        serviceId,
        success: (res) => {
          resolve(res.characteristics);
        },
        fail: (err) => {
          reject(err);
        },
      });
    });
  },

  async readCharacteristicValue(deviceId: string, serviceId: string, characteristicId: string): Promise<WechatMiniprogram.GeneralCallbackResult> {
    return new Promise((resolve, reject) => {
      wx.readBLECharacteristicValue({
        deviceId,
        serviceId,
        characteristicId,
        success: (res) => {
          resolve(res);
        },
        fail: (err) => {
          reject(err);
        },
      });
    });
  },

  async writeCharacteristicValue(deviceId: string, serviceId: string, characteristicId: string, value: ArrayBuffer): Promise<WechatMiniprogram.GeneralCallbackResult> {
    return new Promise((resolve, reject) => {
      wx.writeBLECharacteristicValue({
        deviceId,
        serviceId,
        characteristicId,
        value,
        success: (res) => {
          resolve(res);
        },
        fail: (err) => {
          reject(err);
        },
      });
    });
  },

  async notifyCharacteristicValueChange(deviceId: string, serviceId: string, characteristicId: string, state: boolean): Promise<WechatMiniprogram.GeneralCallbackResult> {
    return new Promise((resolve, reject) => {
      wx.notifyBLECharacteristicValueChange({
        deviceId,
        serviceId,
        characteristicId,
        state,
        success: (res) => {
          resolve(res);
        },
        fail: (err) => {
          reject(err);
        },
      });
    });
  },
};
