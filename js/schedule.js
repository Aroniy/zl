/**
 * Created by zhang_zx on 2018/12/16.
 */

Vue.component("schedule-detail", {
    props:["detail", "edit_traffic", "show_add_city", "hotel_meals"],
    template:`<div class="schedule-detail">
                    <div class="schedule-detail-top">
                        <input type="text" id="schedule-date" placeholder="点击选择日期" :value="detail.date">
                        <div class="add-city">
                            <span class="city-list"><span v-for="(item, index) in detail.cities"> {{item.city}} </span></span>
                            <div class="add-city-btn" @click="add_city" v-show="!show_add_city"><i class="layui-icon">&#xe654;</i><span>增加城市</span></div>
                            <div class="add_city_con"v-show="show_add_city">
                                <input type="text" placeholder="请输入城市名" @input="city_input">
                                <div class="layui-btn layui-btn-sm" @click="add_city_sure">确定</div>
                            </div>
                        </div>
                    </div>
                    <!--交通-->
                    <div class="traffic" v-show="detail.cities.length>=2" v-for="(item, index) in detail.cities" v-if="(index+1)<detail.cities.length">
                        <img src="img/u1252.png" class="schedule-icon" alt="">
                        <div class="schedule-start">
                            <h3>{{detail.cities[index].city}}</h3>
                            <input type="text" :value="detail.cities[index].depart_airport" placeholder="机场信息" @input="airport_start($event.target.value, index)">
                            <input type="text" :value="detail.cities[index].depart_terminal" placeholder="航班信息" @input="terminal_start($event.target.value, index)">
                        </div>
                        <div class="start-time">
                            <h3>{{detail.date}}</h3>
                            <input type="text" :value="detail.cities[index].depart_time" placeholder="航班时间" @input="flight_start($event.target.value, index)">
                        </div>
                        <img src="img/u1257.png" class="fly-icon" alt="">
                        <div class="end-time">
                            <h3>{{detail.date}}</h3>
                            <input type="text" :value="detail.cities[index+1].arrived_time" placeholder="航班时间" @input="flight_end($event.target.value, index)">
                        </div>
                        <div class="schedule-end">
                            <h3>{{detail.cities[index+1].city}}</h3>
                            <input type="text" :value="detail.cities[index+1].arrived_airport" placeholder="机场信息" @input="airport_end($event.target.value, index)">
                            <input type="text" :value="detail.cities[index+1].arrived_terminal" placeholder="航班信息" @input="terminal_end($event.target.value, index)">
                        </div>
                        <div class="schedule-opera" @click="delete_traffic(index)">
                            <i class="layui-icon delete-icon">&#xe640;</i>
                        </div>
                    </div>
                    <!--景点-->
                    <div class="jdap" v-for="(item, index) in detail.detail" v-show="detail.detail.length>0">
                        <div class="jdap-top">
                            <img src="img/u1253.png" class="schedule-icon" alt="">
                            <div class="jdap-name">{{item.name}}</div>
                            <div class="jdap-time">{{item.tips}}</div>
                            <div class="schedule-opera" @click="delete_scene(index, item.id, item.type)">
                                <i class="layui-icon delete-icon">&#xe640;</i>
                            </div>
                        </div>
                        <div class="jd-input">
                            <textarea name="" id="" class="layui-textarea" placeholder="景点介绍"></textarea>
                            <input type="text" class="layui-input" placeholder="注意事项">
                        </div>                        
                    </div>
                    <div class="layui-btn layui-btn-sm" style="margin:20px auto;display: block;width:80px;" v-show="detail.detail.length > 0 || detail.cities.length > 1" @click="save_schedule">保存</div>
                    <!--无安排-->
                    <div class="no_schedule" v-show="detail.detail.length == 0 && detail.cities.length <= 1"> 
                        <i class="layui-icon layui-icon-tips"></i> 
                        <span>暂无行程安排</span>
                    </div>
                    <!--酒店-->
                    <div class="hotel">
                        <img src="img/u1254.png" class="schedule-icon" alt="">
                        <div class="hotel-name" @click="select_hotel">{{detail.hotel.name?detail.hotel.name:'点击选择酒店'}}</div>
                        <div class="meals">
                            <img src="img/u1275.svg" class="meals_icon">
                            <div class="layui-input-inline hotel_meals">
                            
                              <div :class="[hotel_meals[0]?'layui-form-checked':'','layui-unselect','layui-form-checkbox']" @click="hotel_filter(0)">
                                <span>早餐</span>
                                <i class="layui-icon layui-icon-ok"></i>
                              </div>
                              <div :class="[hotel_meals[1]?'layui-form-checked':'','layui-unselect','layui-form-checkbox']" @click="hotel_filter(1)">
                                <span>午餐</span>
                                <i class="layui-icon layui-icon-ok"></i>
                              </div>
                              <div :class="[hotel_meals[2]?'layui-form-checked':'','layui-unselect','layui-form-checkbox']" @click="hotel_filter(2)">
                                <span>晚餐</span>
                                <i class="layui-icon layui-icon-ok"></i>
                              </div>
                              <div :class="[hotel_meals[3]?'layui-form-checked':'','layui-unselect','layui-form-checkbox']" @click="hotel_filter(3)">
                                <span>特色</span>
                                <i class="layui-icon layui-icon-ok"></i>
                              </div>
                            </div>
                        </div>                
                    </div>
                </div>`,
    methods:{
        add_city: function(){
            this.$emit("add_city");
        },
        add_city_sure: function(){
            this.$emit("add_city_sure");
        },
        city_input: function(e){
            this.$emit("city_input", e.target.value);
        },
        delete_traffic: function(index){
            this.$emit("delete_traffic", index)
        },
        airport_start: function(val, index){
            this.$emit("airport_start", val, index);
        },
        terminal_start: function(val, index){
            this.$emit("terminal_start", val, index);
        },
        flight_start: function(val, index){
            this.$emit("flight_start", val, index);
        },
        flight_end: function(val, index){
            this.$emit("flight_end", val, index);
        },
        airport_end: function(val, index){
            this.$emit("airport_end", val, index);
        },
        terminal_end: function(val, index){
            this.$emit("terminal_end", val, index);
        },
        delete_scene: function(index, id, type){
            this.$emit("delete_scene", index, id, type);
            console.log(index)
        },
        select_hotel: function(){
            this.$emit("select_hotel");
        },
        hotel_filter: function(index){
            this.$emit("hotel_filter", index);
        },
        save_schedule: function(){
            this.$emit("save_schedule")
        }
    }
})

var app = new Vue({
    el: "#app",
    data: {

        //日程列表
        scheduleList:[
            {
                date:"",
                cities:[

                ],
                detail:[

                ],
                hotel:{}
            }
        ],

        current_schedule:0,  //选中的行程
        current_date:"",    //选中的行程日期
        edit_traffic:false,
        show_add_city:false,
        add_city_name:"",



        //景点列表
        sceneList: [
            {
                name:"故宫博物馆",
                star:4.5,
                msg:"80%人选择",
                tips:"推荐2小时游玩时间",
                pic:"./img/bhddy_03.jpg",
                checked:false,
                id:0,
                type:"scene"
            }
        ],

        //景点套餐
        meal: [
            {
                name:"北京一日游",
                msg:"80%人选择",
                tips:"故宫博物馆、颐和园、长城、天坛",
                pic:"./img/bhddy_03.jpg",
                checked:false,
                id:0,
                type:"meal"
            }
        ],

        //酒店选择 默认勾选早餐午餐晚餐特色
        hotel_meals:[false, true, true, true],

        show_hotel_select:false,

        selected_hotel_index:0,

        hotel_list:[
            {
                name:"希尔顿酒店1",
                msg:"80%人选择",
                pic:"./img/bhddy_03.jpg",
                address:"西安市环南路西段69号"
            },{
                name:"希尔顿酒店2",
                msg:"80%人选择",
                pic:"./img/bhddy_03.jpg",
                address:"西安市环南路西段69号"
            },{
                name:"希尔顿酒店3",
                msg:"80%人选择",
                pic:"./img/bhddy_03.jpg",
                address:"西安市环南路西段69号"
            }
        ]

    },
    mounted: function(){
        var that = this;
        layui.use(['laydate'], function() {
            var laydate = layui.laydate;
            laydate.render({
                elem:"#schedule-date",
                showBottom: false,
                done: function(value, date, endDate){
                    that.current_date = value;
                    that.date_sort();
                }
            })
        })
    },
    methods: {
        add_schedule: function(){
            var obj = {
                date:"",
                cities:[],
                detail:[],
                hotel:{}
            };
            var last_schedule = this.scheduleList[this.scheduleList.length-1];
            if(last_schedule.date*1 == 0 || last_schedule.cities.length == 0){
                layui.use("layer", function(){
                    var layer = layui.layer;
                    layer.msg('请先输入前一天的城市跟日期~', {icon: 0});
                })
                return;
            }
            var date = new Date(last_schedule.date)*1 + 24*60*60*1000;
            var cur_date = new Date(date);
            obj.date = cur_date.getFullYear() + "-" + ((cur_date.getMonth()+1)<10?"0"+(cur_date.getMonth()+1):(cur_date.getMonth()+1)) + "-" + (cur_date.getDate()<10?"0"+cur_date.getDate():cur_date.getDate());
            obj.cities.push(last_schedule.cities[last_schedule.cities.length-1]);
            this.scheduleList.push(obj);
        },

        select_schedule: function(index){
            this.current_schedule = index;
            var that = this;
            layui.use(['laydate'], function() {
                var laydate = layui.laydate;
                laydate.render({
                    elem:"#schedule-date",
                    showBottom: false,
                    done: function(value, date, endDate){
                        that.current_date = value;
                        that.date_sort();
                    }
                })
            })
        },

        date_sort: function(){
            var cur_index = this.current_schedule,
                len = this.scheduleList.length,
                date = this.current_date;
            if(cur_index!=0){
                //改变的日期不是行程第一天
                for(var i=cur_index;i>=0;i--){
                    //处理改变日期之前的日期
                    var _date = new Date(new Date(date)*1 - (cur_index-i)*24*60*60*1000);
                    this.scheduleList[i].date = _date.getFullYear() + "-" + ((_date.getMonth()+1)<10?"0"+(_date.getMonth()+1):(_date.getMonth()+1)) + "-" + (_date.getDate()<10?"0"+_date.getDate():_date.getDate());
                }
                for(var k=cur_index;k<len;k++){
                    //处理改变日期之后的日期
                    var _date = new Date(new Date(date)*1 + (k-cur_index)*24*60*60*1000);
                    this.scheduleList[k].date = _date.getFullYear() + "-" + ((_date.getMonth()+1)<10?"0"+(_date.getMonth()+1):(_date.getMonth()+1)) + "-" + (_date.getDate()<10?"0"+_date.getDate():_date.getDate());
                }
            }else{
                //改变的日期是行程第一天
                for(var j=0;j<len;j++){
                    var _date = new Date(new Date(date)*1 + j*24*60*60*1000);
                    this.scheduleList[j].date = _date.getFullYear() + "-" + ((_date.getMonth()+1)<10?"0"+(_date.getMonth()+1):(_date.getMonth()+1)) + "-" + (_date.getDate()<10?"0"+_date.getDate():_date.getDate());
                }
            }
        },

        add_city: function(){
            this.show_add_city = true;
            console.log("添加城市")
        },

        city_input: function(val){
            this.add_city_name = val;
        },

        add_city_sure: function(){
            if(!this.add_city_name) {
                layui.use("layer", function(){
                    var layer = layui.layer;
                    layer.msg('请输入城市名~', {icon: 0});
                })
                return;
            }
            this.show_add_city = false;
            var obj = {
                city:this.add_city_name,
                depart_airport:"",
                depart_terminal:"",
                depart_time:"",
                arrived_time:"",
                arrived_airport:"",
                arrived_terminal:"",
            }
            this.scheduleList[this.current_schedule].cities.push(obj);
        },

        delete_traffic: function(index){
            var arr = this.scheduleList[this.current_schedule].cities,
                index = index + 1;
            arr.splice(index,1);
            this.scheduleList[this.current_schedule].cities = arr;
        },

        airport_start: function(value, index){
            this.scheduleList[this.current_schedule].cities[index].depart_airport = value;
        },
        terminal_start:  function(value, index){
            this.scheduleList[this.current_schedule].cities[index].depart_terminal = value;
        },
        flight_start: function(value, index){
            this.scheduleList[this.current_schedule].cities[index].depart_time = value;
        },
        flight_end: function(value, index){
            this.scheduleList[this.current_schedule].cities[index+1].arrived_time = value;
        },
        airport_end: function(value, index){
            this.scheduleList[this.current_schedule].cities[index+1].arrived_airport = value;
        },
        terminal_end: function(value, index){
            this.scheduleList[this.current_schedule].cities[index+1].arrived_terminal = value;
        },


        scene_add_to_schedule: function(index){
            var cur_scene = this.sceneList[index];
            if(cur_scene.checked) return;
            cur_scene.checked=true;
            this.scheduleList[this.current_schedule].detail.push(cur_scene);
        },
        meal_add_to_schedule: function(index){
            var cur_scene = this.meal[index];
            if(cur_scene.checked) return;
            cur_scene.checked=true;
            this.scheduleList[this.current_schedule].detail.push(cur_scene);
        },

        delete_scene: function(index, id, type){
            var arr = this.scheduleList[this.current_schedule].detail;
            arr.splice(index,1);
            this.scheduleList[this.current_schedule].detail = arr;
            if(type=="scene"){
                this.sceneList[id].checked = false;
            }else if(type=="meal"){
                this.meal[id].checked = false;
            }
        },

        // 删除某一天行程
        deleteDay: function(index){
            if(this.scheduleList.length==1) return;
            if(index==0 || index==this.scheduleList.length-1){
                this.scheduleList.splice(index, 1);
                if(this.current_schedule>=this.scheduleList.length){
                        this.current_schedule = this.scheduleList.length-1;
                    }
            }else{
                var date_delete = this.scheduleList[index].date;
                this.scheduleList.splice(index, 1);
                var len = this.scheduleList.length;
                for(var i=index;i<len;i++){
                    console.log(i);
                    var _date = new Date(new Date(date_delete)*1 + (i-index)*24*60*60*1000);
                    console.log(_date);
                    this.scheduleList[i].date = _date.getFullYear() + "-" + ((_date.getMonth()+1)<10?"0"+(_date.getMonth()+1):(_date.getMonth()+1)) + "-" + (_date.getDate()<10?"0"+_date.getDate():_date.getDate());
                }

            }
        },

        //酒店选择
        hotel_filter: function(index){
            var arr = this.hotel_meals.slice();
            arr[index] = !arr[index];
            this.hotel_meals = arr;
        },
        open_hotel: function(){
            this.show_hotel_select = true;
        },
        close_hotel_select: function(){
            this.show_hotel_select = false;
        },
        select_hotel: function(index){
            this.selected_hotel_index = index;
        },
        add_hotel: function(){
            this.scheduleList[this.current_schedule].hotel = this.hotel_list[this.selected_hotel_index];
            this.show_hotel_select = false;
            console.log(this.scheduleList[this.current_schedule].hotel)
        },




        //保存行程
        save_schedule: function(){
            console.log("保存行程")
        }
    }
})