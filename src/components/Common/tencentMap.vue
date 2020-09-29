// 腾讯地图组件，可以标出当前位置到目的地的路线
<template>
  <div id="map"></div>
</template>

<script>
export default {
	name: 'TencentMap',
	props: {
		nowLoc: {
			type: Object
		},
		targetLoc: {
			type: Object
		}
	},
  data () {
		return {
			map: null,
      transfer_plans: null,
      station_markers: [],
      transfer_lines: [],
      walk_lines: [],
      start_marker: null,
      end_marker: null
		}
  },
	mounted () {
		// 初始化地图
		this.initMap()
    this.drawRoad()
	},
	methods: {
		initMap () {
      // 步骤：定义map变量 调用 qq.maps.Map() 构造函数，获取地图显示容器
      // 地图中心店设置为考场所在的楼栋，113.411806,23.053945
      let myOptions = {
        zoom: 12,               // 设置地图缩放级别
        center: this.targetLoc,      // 设置中心点样式
        mapTypeId: window.qq.maps.MapTypeId.ROADMAP  // 设置地图样式详情参见MapType
      }
      // 获取dom元素添加地图信息
      this.map = new window.qq.maps.Map(document.getElementById('map'), myOptions);
    },
    transferService () {
      let that = this
      const service = new window.qq.maps.TransferService({
        // location: "广州",
        complete: result => {
          result = result.detail;
          let start = result.start,
          end = result.end;
          let anchor = new window.qq.maps.Point(6, 6),
          size = new window.qq.maps.Size(24, 36),
          start_icon = new window.qq.maps.MarkerImage('../../assets/img/map/busmarker.png', size),
          end_icon = new window.qq.maps.MarkerImage('../../assets/img/map/busmarker.png', size, new window.qq.maps.Point(24, 0), anchor);

          that.start_marker && that.start_marker.setMap(null);
          that.end_marker && that.end_marker.setMap(null);
          that.start_marker = new window.qq.maps.Marker({
            icon: start_icon,
            position: start.latLng,
            map: that.map,
            zIndex: 1
          });
          that.end_marker = new window.qq.maps.Marker({
            icon: end_icon,
            position: end.latLng,
            map: that.map,
            zIndex: 1
          });

          that.transfer_plans = result.plans;
          // let plans_desc = [];
          // for (let i = 0; i < that.transfer_plans.length; i++) {
          //   //plan desc.  
          //   let p_attributes = ['onclick="renderPlan(' + i + ')"', 'onmouseover=this.style.background="#eee"', 'onmouseout=this.style.background="#fff"', 'style="margin-top:-4px;cursor:pointer"'].join(' ');
          //   plans_desc.push('<p ' + p_attributes + '><b>方案' + (i + 1) + '.</b>');
          //   let actions = that.transfer_plans[i].actions;
          //   for (let j = 0; j < actions.length; j++) {
          //       let action = actions[j],
          //       img_position;
          //       action.type == window.qq.maps.TransferActionType.BUS && (img_position = '-38px 0px');
          //       action.type == window.qq.maps.TransferActionType.SUBWAY && (img_position = '-57px 0px');
          //       action.type == window.qq.maps.TransferActionType.WALK && (img_position = '-76px 0px');

          //       let action_img = '<span style="margin-bottom: -4px;' + 'display:inline-block;background:url(img/busicon.png) ' + 'no-repeat ' + img_position + ';width:19px;height:19px"></span>&nbsp;&nbsp;';
          //       plans_desc.push(action_img + action.instructions);
          //   }
          // }
          // 方案文本描述
          // document.getElementById('plans').innerHTML = plans_desc.join('<br><br>');

          // 渲染到地图上
          that.renderPlan(0);
        }
      })

      return service
    },
    drawRoad () {
      // 当前位置和目标位置
      // 从当前位置到目标位置的导航，默认较便捷路线
      let transferService = this.transferService()
      // console.log('tencentMap.vue-nowLoc:', this.nowLoc)
      // console.log('tencentMap.vue-target:', this.targetLoc)
      transferService.search(this.nowLoc, this.targetLoc)
      // console.log('policy', window.qq.maps.TransferActionType.LEAST_TIME)
      // transferService.setPolicy(window.qq.maps.TransferActionType.LEAST_TIME)
    },
    // 清除地图上的marker
    clearOverlay (overlays) {
      let overlay = overlays.pop()
      while (overlay) {
        overlay.setMap(null);
        overlay = overlays.pop()
      }
    },
    renderPlan (index) {
      let plan = this.transfer_plans[index],
      lines = plan.lines,
      walks = plan.walks,
      stations = plan.stations;
      this.map.fitBounds(plan.bounds);
      // clear overlays;
      this.clearOverlay(this.station_markers);
      this.clearOverlay(this.transfer_lines);
      this.clearOverlay(this.walk_lines);
      let anchor = new window.qq.maps.Point(6, 6),
      size = new window.qq.maps.Size(24, 36),
      bus_icon = new window.qq.maps.MarkerImage('../../assets/img/map/busmarker.png', size, new window.qq.maps.Point(48, 0), anchor),
      subway_icon = new window.qq.maps.MarkerImage('../../assets/img/map/busmarker.png', size, new window.qq.maps.Point(72, 0), anchor);
      // draw station marker
      for (let j = 0; j < stations.length; j++) {
				let station = stations[j];
				let station_icon = null
				if (station.type === window.qq.maps.PoiType.SUBWAY_STATION) {
					station_icon = subway_icon;
				} else {
						station_icon = bus_icon;
				}
				let station_marker = new window.qq.maps.Marker({
					icon: station_icon,
					position: station.latLng,
					map: this.map,
					zIndex: 0
				});
				this.station_markers.push(station_marker);
      }
      // draw bus line
      for (let j = 0; j < lines.length; j++) {
				let line = lines[j];
				let polyline = new window.qq.maps.Polyline({
					path: line.path,
					strokeColor: '#3893F9',
					strokeWeight: 6,
					map: this.map
				});
				this.transfer_lines.push(polyline);
      }
      // draw walk line
      for (let j = 0; j < walks.length; j++) {
				let walk = walks[j];
				let polyline = new window.qq.maps.Polyline({
					path: walk.path,
					strokeColor: '#3FD2A3',
					strokeWeight: 6,
					map: this.map
				});
				this.walk_lines.push(polyline);
      }
    },
	}
}
</script>

<style lang="stylus" scoped>
#map 
	width 100%
	height 100%
</style>


