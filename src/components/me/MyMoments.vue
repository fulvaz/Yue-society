<template lang="html">
  <div class="container">
    <header class="moment-header">
      <div class="container">
        <h1 class="title-name">我的动态</h1>
        <div class="btn-group">
          <button class="btn-post" @click="newMoment">
            <fa-icon name="camera" class="icon"></fa-icon>
          </button>
        </div>
      </div>
    </header>
    <moment v-model="moments" class="moment">
    </moment>
    <load-more-btn @click="getMoments"></load-more-btn>
  </div>
</template>

<script>
import Moment from '../circle/Moment'
import * as api from '../../api/index.js'
import * as utils from '../../utils/utils.js'
import LoadMoreBtn from '../common/buttons/LoadMore'
import Editor from '../common/editor/main.js'

import 'vue-awesome/icons/camera'
export default {
  components: {
    'load-more-btn': LoadMoreBtn,
    'moment': Moment
  },
  data () {
    return {
      moments: [],
      momentPage: 0
    }
  },
  created () {
    this.getMoments().then(e => {
      return api.wxAuth(['uploadImage', 'previewImage', 'chooseImage'])
    }).catch(res => {
      this.handleFatalErr(res)
    })
  },
  methods: {
    getMoments () {
      this.openIndicator()
      return new Promise((resolve, reject) => {
        api.getMyMoments(this.$store.state.MeState.uid, this.momentPage++, 10).then(res => {
          this.closeIndicator()
          let remoteData = utils.response2Data(res)
          if (remoteData.length === 0) {
            this.toast('没有新数据了')
          }
          this.moments = this.moments.concat(remoteData.map(e => {
            e.date = utils.date2YMDHMM(e.date)
            return e
          }))
          resolve(res)
        }).catch(res => {
          this.handleAllFail(res)
          reject(res)
        })
      })
    },
    newMoment () {
      Editor.open({
        head: '发布新动态',
        requireTitle: false
      }).then(result => {
        let data = {
          content: result.content,
          uid: this.$store.state.MeState.uid,
          imgServerIds: result.imgs
        }
        this.openIndicator()
        api.newMyMoment(data).then(res => {
          this.closeIndicator()
          this.toast('发布新动态成功')
          Editor.close()
          window.location.reload()
        }).catch(res => {
          this.handleAllFail(res)
        })
      })
    }
  }
}
</script>

<style lang="scss">
  @import "../../assets/index.scss";
  // .rec-heading {
  //   margin: 0;
  //   margin-bottom: 5px;
  //   padding: 5px 0;
  //   @include item-description;
  //   border: 1px solid $list-border-color;
  //   background: $douban-blue;
  //   color: white;
  //  .icon {
  //    width: 12px;
  //    height: 12px;
  //  }
  // }
  .moment-header {
    width: 100%;
    background-color: rgb(44, 175, 187);

    .container {
      // @include clearfix;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.5em $horizontal-margin;
      text-align: center;
      color: white;
      background-color: rgb(44, 175, 187);

      .title-name {
        float: left;
        margin: 0;
        @include item-description;
        color: white;
      }

      .btn-group {
        float: right;
        .disabled {
          color: #aaa;
          border: 1px solid #aaa;
        }
        button {
          // border: 1px solid white;
          border-radius: 4px;
          font-size: 15px;
          padding: 0;
          color: white;
          background-color: transparent;
        }
      }
    }
  }
  .moment {
    padding: 0 $horizontal-margin;
  }
</style>
