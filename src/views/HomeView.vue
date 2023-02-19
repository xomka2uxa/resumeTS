<template>
  <div class="main main--home">
    <div class="overlay"></div>
    <div class="container">
      <div class="inner">
        <div class="text__content col-50">
          <div class="header">
            <p>Онлайн-конструктор</p>
            <p class="header-border">для создания</p>
            <p>крутого резюме</p>
          </div>
          <p class="description">
            В нашем сервисе Вы сможете создать свое резюме, выбрав расположение
            блоков и их цветовую гамму. А также скачать это резюме.
          </p>
          <div class="btn__wrapper">
            <router-link :to="`/creating`" class="btn__link">
              Начать
              <mdicon name="arrow-right-thin" class="btn__icon" />
            </router-link>
          </div>
        </div>
        <div class="image__content col-50">
          <img :src="image" alt="Примеры резюме" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="js">
export default {
  data() {
      return {
          image: require('@/assets/home-first.png')
      };
  }
};
</script>

<style lang="scss" scoped>
.main--home {
  // min-height: calc(100vh - 125.94px);
  position: relative;
  background: url("@/assets/denim.webp") repeat;

  @include lg-down {
    height: auto;
    // min-height: calc(100vh - 124px);
  }

  .overlay {
    background: rgba(#2b2b2d, 0.8);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .container {
    height: 100%;
  }

  .inner {
    display: flex;
    align-items: center;
    height: 100%;
    padding: 5px;

    @include lg-down {
      flex-direction: column;
    }

    .text__content {
      margin-right: 15px;

      @include lg-down {
        margin-right: 0;
        margin-top: 20px;
        margin-bottom: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .header {
        p {
          font-family: Roboto Condensed, Arial, sans-serif;
          font-weight: bold;
          font-size: 40px;
          text-transform: uppercase;
          color: #fff;

          @include lg-down {
            text-align: center;
          }

          @include sm-down {
            font-size: 25px;
            color: #fff;
          }

          &.header-border {
            text-shadow: -1px 0 rgb(255, 255, 255), 0 1px rgb(255, 255, 255),
              1px 0 rgb(255, 255, 255), 0 -1px rgb(255, 255, 255);
            color: #2e3034;

            @include sm-down {
              text-shadow: none;
              color: #fff;
            }
          }

          &:last-child {
            font-family: Arial, sans-serif;
            background-image: linear-gradient(to right, #de8e22, #c07209);
            color: transparent;
            -webkit-background-clip: text;
            background-clip: text;
          }
        }
      }

      .description {
        margin-top: 20px;
        margin-bottom: 30px;
        color: #a7a7a7;
        font-family: Arial, sans-serif;
        font-size: 16px;

        @include lg-down {
          width: 90%;
        }

        @include sm-down {
          width: 100%;
          font-size: 14px;
        }
      }

      .btn__wrapper {
        color: #fff;
        width: 35%;

        @include sm-down {
          width: 55%;
        }

        @include xs-down {
          width: 90%;
        }

        .btn__link {
          padding: 10px 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          background-image: linear-gradient(to right, #de8e22, #c07209);
          border-radius: 20px;
          color: #fff;
          font-family: Arial, sans-serif;
          text-transform: uppercase;
          margin-right: 5px;

          &:hover,
          &:active {
            background-image: linear-gradient(to left, #de8e22, #c07209);
          }
        }
      }
    }
    .image__content {
      margin-left: 15px;

      @include lg-down {
        margin-left: 0;
        display: flex;
        justify-content: center;
      }

      img {
        max-width: 100%;
      }
    }
  }
}
</style>
