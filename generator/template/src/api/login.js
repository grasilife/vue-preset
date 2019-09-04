import services from "@/services/index";

export function driverScreenInfo(data) {
  return services({
    url: "/rest/common/deviceCommand/driverScreenInfo",
    method: "post",
    data
  });
}
export function getOnlineVehicleList() {
  return services({
    url: "/rest/common/getOnlineVehicleList",
    method: "get"
  });
}
