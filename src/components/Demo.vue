<template>
   <transition name="public-slide">
   <div id="demo-wrapper">
      <div id="grid" v-if="show==0"> 
         <div class="demo" v-for="(item,index) in demos" :key="index" :class="[item.name]"
         :style="{gridColumn:item.col,gridRow:item.row}" @click="demoIn(item.finish,item.id)">
            <transition name="slide">
            <div class="bg" i="url('../assets/Collections/1.png')" v-if="item.show">
               <span class="text">
                  <i v-for="(word,wordI) in item.cnName.split('')" :key="wordI"
                     :a="item.enName.split('')[wordI]">{{word}}</i>
               </span>
               <div class="info">
                  <div><span>时间：</span><br><span>{{item.time}}</span></div>
                  <mark></mark>
                  <div><span>使用：</span><br><span>{{item.use}}</span></div>
                  <mark></mark>
                  <div><span>点击次数：</span><br><span>{{item.number}}</span></div>
               <button ><i></i>
                  {{$store.state.isPhone?'点击进入':'点击进入'}}
               </button>
            </div></div>
            </transition>
         </div>
      </div>
      <div v-html="style" v-for="(style,index) in styles" :key="index"></div>
      <!-- <snake v-if="show==1"></snake>
      <disk v-if="show==2"></disk>
      <gossip v-if="show==3"></gossip> -->
   </div>
   </transition>
      

</template>

<script>
// show已经弃用
	import snake from './Collections/snake.vue'
   // import daily from './Collections/daily.vue'
   import disk from './Collections/disk.vue'
   export default {
      name: "collection",
      components: {snake,disk},
      methods:{
         showing(val){
            this.demos.forEach((item)=>{
               if(val==item.id){
                  // location.hash = `${item.name}`
                  console.log(item.name)
                  this.$router.push(`/demo/${item.name}`)
                  this.show = val;
                  return;
               }
            })
         },
         demoIn(jud,id){
            if(jud){
               this.showing(id)
            }else if(id==2){
					window.open("http://mc.funx.work/");
               
            }else if(id==4){
               this.$alert("还没做完呢 QAQ","false")
            }else if(id==5){
               window.open('https://www.npmjs.com/package/byte-monitor-jssdk')
            }
         },
         gridToggle(val){
            this.demos.forEach((item)=>{
               if(val){
                  item.row = item.mRow
                  item.col = item.mCol
               }else{
                  item.row = item.pRow
                  item.col = item.pCol
               }
            })
			},
      },
      data() {
         return {
            styles:[],
            show:0,
            demos:[{
               name:'snake',cnName:"贪吃蛇游戏",enName:'SNAKE',time:'19.10.10',use:'ZRender',number:'--',id:1,show:false,
					col:'',row:'',color:'#FFBC7F',color2:'#E7A568',finish:true,
					pCol:'3/3',pRow:'1/5',mCol:'1/2',mRow:'14/18',
               
            },{
               name:'disk',cnName:'个人云盘',enName:'DISK',time:'19.10.30',use:'Node',number:'--',id:3,show:false,
               col:'',row:'',color:'#FF8F7F',color2:'#E88172',finish:true,
               pCol:'2/3',pRow:'1/8',mCol:'1/2',mRow:'7/12',
            },
            {
					name:'daily',cnName:'《我的世界》游戏',enName:'为了毕业被迫抄的',time:'21.6.2',use:'three.js',number:'Github抄的',id:2,show:false,
					col:'',row:'1/6',color:'#7FB1FF',color2:'rgb(114,159,231)',finish:false,
               pCol:'1/2',pRow:'1/6',mCol:'1/2',mRow:'1/5',
            },
            {
					name:'react',cnName:'REACT',enName:'react',time:'21.9.16',use:'--',number:'--',id:4,show:false,
					col:'',row:'',color:'#B9D888',color2:'rgb(121,178,47)',finish:false,
               pCol:'1/2',pRow:'8/13',mCol:'1/2',mRow:'20/24',
            },
            {
					name:'monitor',cnName:'前端监控系统 ',enName:'monitor',time:'21.8.20',use:'--',number:'--',id:5,show:false,
					col:'',row:'',color:'#50A2CA',color2:'rgb(39,93,155)',finish:false,
               pCol:'3/4',pRow:'7/11',mCol:'1/2',mRow:'20/24',
            }
            ],
         };
      },
      created(){
         
      },
      mounted(){
         // console.log(this.$store.state.isPhone + '???')
         this.gridToggle(this.$store.state.isPhone)
         var ban = 'rgb(166, 140, 140)'
         this.demos.forEach((item,index)=>{
            if(location.hash==='#'+item.name){
               this.showing(item.id)
            }
            this.styles.push(`<style>
            .${item.name} .bg{
               box-shadow: 0px 12px 17px -5px ${item.color};
               background-image:url('http://funx.work/resource/junk/Demo/${item.name}.png');
            }
            .${item.name} .text::before{
               background-image:url('http://funx.work/resource/junk/Demo/${item.name}.png');
            }
            .${item.name} .info{
               box-shadow:0px 12px 16px -7px ${item.color};
            }
            .${item.name} button{
               box-shadow:0px 6px 10px -3px ${item.color};
               background-color: ${item.finish?item.color:item.color};
            }
            .${item.name} button:hover{
               background-color: ${item.finish?item.color2:item.color2}; // = =||
            }
            </style>`)
            setTimeout(()=>{
               item.show = true
            },(index+2.2)*90)
         })
      },
      watch:{
         "$store.state.title":function(val){
            this.$set(this.$store.state.path,1,{name:val})
         },
         "$store.state.isPhone":function(val){
            this.gridToggle(val)
         }
      }
   };
</script>

<style lang="scss" scoped>
   #demo-wrapper{
      // color:;
      margin: 0rem auto 0;
      padding-top: 0.5rem;
      .demo{
       color:rgb(166, 140, 140);  
      }
      #grid{
         margin: 0 2rem;
         grid-template-columns: repeat(3,minmax(1rem,1fr));
         grid-template-rows: repeat(14,4rem);
         justify-content:space-around;
         grid-gap: 0rem 2rem;
         display: grid;
         .bg{
            // overflow: hidden;
            position: relative;
            width:100%;
            height:100%;
            // box-shadow:0px 12px 17px -5px #7FB1FF;
            background-position: 50% 50%;
            background-size: cover;
            // display: grid;
            // grid-template-columns: repeat(1,auto);
            // grid-template-rows: repeat(10,1fr);
            //justify-content: center;
            &:hover .text i{
               top:-40px;
               left:-0.5rem;
               transform: translateX(50px);
               margin:0 0.5rem;
               // letter-spacing: 0.8rem;
            }
            .text{
               i{
                  user-select: none;
                  top:0;
                  left:0;
                  transition: 0.25s all cubic-bezier(0.215, 0.610, 0.355, 1.000);
                  position: relative;
                  font-style:normal;
                  letter-spacing: 0.2rem;
                  $i: 1;
                  @while $i < 12 {
                      &:nth-child(#{$i}) {
                          transition-delay: $i / 20 + s;
                      }
                      $i: $i + 1;
                  }
               }
               i::before{
                  user-select: none;
                  top:40px;
                  position: absolute;
                  content: attr(a);
               }
               position: absolute;
               text-shadow: 1px 1px 2px rgba(150, 150, 150, 1);
               z-index: 2;
               left:50%;
               top:25%;
               transform: translate(-50%);
               white-space: nowrap;
               text-align: center;
               width:auto;
               min-width: 40%;
               // min-width: 8rem;
               font-size: 2.5rem;
               font-weight: bold;
               letter-spacing: 0.2rem;
               color:rgb(255, 255, 255);
               border:0.4rem solid rgb(255, 255, 255);
               padding:0.6rem 1.5rem;
               text-transform: uppercase;
               overflow: hidden;
               &::before{
                  margin:-2rem;
                  z-index: -1;
                  content: '';
                  position: absolute;
                  top:0;right:0;bottom: 0;left: 0;
                  // background-color: rgba(255, 64, 64, 0.923);
                  background-size: 300% 300%;
                  background-position: center 40%;
                  filter: blur(10px);
                  // background-image:url('../assets/Collections/1.svg');
               }
            }
         }
         .info{
            position: absolute;
            width: calc(100% - 2rem);
            left:1rem;
            bottom:-4rem;
            border-radius: 0.5rem;
            background-color:white;
            // box-shadow:0px 12px 16px -7px #7FB1FF;
            height:auto;
            padding:2rem 0 2.8rem;
            display: flex;
            justify-content: space-around;
            align-items: center;
            mark{
               margin: 0 -2rem;
               width: 2px;
               height:2rem;
               background-color: rgb(241, 241, 241);
            }
            div{
               letter-spacing: 0.03rem;
               font-size: 1.4rem;
               span:nth-of-type(1){
                  color:#aaa;
               }
               span:nth-of-type(2){
                  color:rgb(73, 73, 73);
                  font-size: 1.5rem;
                  font-weight: bold;
               }
            }
            button{
               white-space: nowrap;
               min-width:12rem;
               width:70%;
               position: absolute;
               top:80%;
               left:50%;
               // box-shadow:0px 6px 10px -3px #7FB1FF;
               transform: translateX(-50%);
               letter-spacing: .15rem;
               // background-color: #7FB1FF;
               border-radius: 2.2rem;
               margin:0;
               font-size: 1.7rem;
               padding:0.7rem 1rem;
               font-weight: bold;
               &:hover{
                  // background-color: rgb(114, 159, 231);
               }
            }
         }
      }
   }
   @media screen and (max-width: 768px) {
      #demo-wrapper #grid{
         margin: 0 2rem;
         grid-template-columns: repeat(1,minmax(1rem,1fr));
         grid-template-rows: repeat(24,4rem);
      }
   }
   .slide-enter-active,
   .slide-leave-active{
      transition: all 0.35s cubic-bezier(0.215, 0.610, 0.355, 1.000);
   }
   .slide-enter,
   .slide-leave {
      opacity: 0;
      transform: translateX(-20px);
   }
</style>