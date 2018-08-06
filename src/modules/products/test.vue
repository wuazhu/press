<template>
  <div class="abc">
    <div class="box">
      <vue-cropper
        ref="cropperRef"
        :img="example2.img"
        :outputSize="example2.size"
        :outputType="example2.outputType"
        :info="example2.info"
        :canScale="example2.canScale"
        :autoCrop="example2.autoCrop"
        :autoCropWidth="example2.autoCropWidth"
        :autoCropHeight="example2.autoCropHeight"
        :fixed="example2.fixed"
        :fixedNumber="example2.fixedNumber"
      ></vue-cropper>
      <label class="btn" for="uploads">选择图片</label>
      <input type="file" id="uploads" style="position:absolute; clip:rect(0 0 0 0);" accept="image/png, image/jpeg, image/gif, image/jpg" @change="uploadImg($event, 2)" enctype="multipart/form-data">
      <t-button @click="uplImg('blob')">上传</t-button>
    </div>
  </div>
</template>

<script>
import vueCropper from 'vue-cropper'
export default {
  components: {
    vueCropper
  },
  data() {
    return {
      example2: {
        img: 'http://ofyaji162.bkt.clouddn.com/bg1.jpg',
        info: true,
        size: 1,
        outputType: 'jpeg',
        canScale: false,
        autoCrop: true,
        // 只有自动截图开启 宽度高度才生效
        autoCropWidth: 300,
        autoCropHeight: 250,
        // 开启宽度和高度比例
        fixed: true,
        fixedNumber: [1.875, 1]
      }
    }
  },
  methods: {
    uplImg(type) {
      if (type === 'blob') {
				this.$refs.cropperRef.getCropBlob((data) => {
					// var test = window.open('')
          // test.location.href = window.URL.createObjectURL(data)
          console.log(1,data)
				})
			} else {
				this.$refs.cropperRef.getCropData((data) => {
					// test.location.href = data
          console.log(2,data)
				})
			}
    },
    uploadImg (e, num) {
			//上传图片
			// this.option.img
			var file = e.target.files[0]
			if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
				 alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
				 return false
			 }
			var reader = new FileReader()
			reader.onload = (e) => {
				let data
				if (typeof e.target.result === 'object') {
					// 把Array Buffer转化为blob 如果是base64不需要
					data = window.URL.createObjectURL(new Blob([e.target.result]))
				} else {
					data = e.target.result
				}
				if (num === 1) {
					this.option.img = data
				} else if (num === 2) {
					this.example2.img = data
				}
			}
			// 转化为base64
			// reader.readAsDataURL(file)
			// 转化为blob
			reader.readAsArrayBuffer(file)
		}
  }
}
</script>

<style lang="less">
.box {
  width: 350px;
  height:200px
}
</style>

