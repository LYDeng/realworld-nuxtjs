<!--
 * @Date: 2021-09-10 16:24:51
 * @LastEditors: lyd
 * @LastEditTime: 2021-09-14 17:24:57
 * @Description: 无 
 * exart 精确匹配
-->
<template>
<div class="home-page">

  <div class="banner">
    <div class="container">
      <h1 class="logo-font">LYD作业</h1>
      <p>A place to share your knowledge.</p>
    </div>
  </div>

  <div class="container page">
    <div class="row">
      <div class="col-md-9">
        <div class="feed-toggle">
          <ul class="nav nav-pills outline-active">
            <li class="nav-item" v-if="user">
              <!-- <a class="nav-link" href="">Your Feed</a> -->
              <nuxt-link 
              class="nav-link" 
              :class="{
                active: tab === 'your_feed'
              }"
              exact  
              :to="{
                name:'home',
                query: {
                  tab: 'your_feed'
                }
              }">Your Feed</nuxt-link>
            </li>
            <li class="nav-item">
              <!-- <a class="nav-link active" href="">Global Feed</a> -->
               <nuxt-link 
               class="nav-link" 
                :class="{
                  active: tab === 'global_feed'
                }"
                exact  
                :to="{
                  name:'home',
                  query: {
                    tab: 'global_feed'
                }
              }">Global Feed</nuxt-link>
            </li>
            <li class="nav-item" v-if="tag">
              <!-- <a class="nav-link active" href="">#{{ tag }}</a> -->
              <nuxt-link 
               class="nav-link" 
                :class="{
                  active: tab === 'tag'
                }"
                exact  
                :to="{
                  name:'home',
                  query: {
                    tab: 'tag',
                    tag: tag
                }
              }">#{{ tag }}</nuxt-link>
            </li>
          </ul>
        </div>

        <div
         class="article-preview"
         v-for="article in articles" :key=article.sulg>
          <div class="article-meta">
            <nuxt-link :to="{ 
              name: 'profile',
              params: {
                username: article.author.username
              }
            }">
            <img :src="article.author.image" />
            </nuxt-link>
            <div class="info">
              <nuxt-link class="author" :to="{ 
              name: 'profile',
              params: {
                username: article.author.username
              }
            }">
            {{ article.author.username }}
            </nuxt-link>
              <span class="date">{{ article.createdAt | date('MMM DD, YYYY') }}</span>
            </div>
            <button 
              class="btn btn-outline-primary btn-sm pull-xs-right"
              :class="{ active:article.favorited}"
              @click="addFavorite(article)"
              :disabled="article.favoriteDisabled"
              >
              <i class="ion-heart"></i> {{ article.favoritesCount }}
            </button>
          </div>
          <nuxt-link :to ="{
            name:'article',
            params:{
              slug: article.slug
            }
          }" class="preview-link">
            <h1>{{ article.title }}</h1>
            <p>{{ article.description }}</p>
            <span>Read more...</span>
          </nuxt-link>
        </div>
        <nav>
          <ul class="pagination">
            <!-- ngRepeat: pageNumber in $ctrl.pageRange($ctrl.totalPages) -->
            <li 
              class="page-item" 
              v-for="item in totalPage"
              :key ="item"
              :class="{ 
                active: item === page
              }"
            >
              <!-- <a class="page-link" :href="'/?page=' + item">{{ item }}</a> -->
              <nuxt-link class="page-link" :to="{
                name: 'home',
                query:{
                  page: item,
                  tag: $route.query.tag,
                  tab: tab
                }
              }">{{ item }}</nuxt-link>
            </li>
            <!-- end ngRepeat: pageNumber in $ctrl.pageRange($ctrl.totalPages) -->
          </ul>
        </nav>
      </div>

      <div class="col-md-3">
        <div class="sidebar">
          <p>Popular Tags</p>

          <div class="tag-list">
            <!-- <a 
            href="" 
            class="tag-pill tag-default"
            v-for="item in tags"
            :key ='item'
            >{{ item }}</a> -->
            <nuxt-link :to="{
                name:'home',
                query: {
                  tag: item,
                  tab: 'tag'
                }
              }"
              class="tag-pill tag-default"
              v-for="item in tags"
              :key ='item'
            >{{ item }}</nuxt-link>
          </div>
        </div>
      </div>

    </div>
  </div>

</div>
</template>
<script>
import { getArticles, getFeedArticles,addFavorite,deleteFavorite } from '@/api/article'
import { getTags } from '@/api/tag'
import { mapState } from 'vuex'
export default {
  name: "HomeIndex",
  watchQuery: ['page', 'tag', 'tab'],
  async asyncData ({ query, store }) {
    const page = Number.parseInt(query.page || 1)
    const limit = 20
    const tab = query.tab || 'global_feed'
    const { tag } = query
    const localArticles = store.state.user && tab === 'your_feed' ? getFeedArticles : getArticles
    //并行
    const [ articleRes, tagRes ] = await Promise.all([
      localArticles({
        limit: limit,
        offset: (page - 1) * limit,
        tag
      }),
      getTags()
    ])
    //串行
    // const { data } = await getArticles({
    //   limit: limit,
    //   offset: (page - 1) * limit,
    // })
    // const { data: tagData } = await getTags()
    const { articles, articlesCount} = articleRes.data   
    const { tags } = tagRes.data   

    articles.forEach(article => article.favoriteDisabled = false)
    
    return {
      articles, // 文章列表
      articlesCount, // 文章总数
      tags, // 标签列表
      limit, // 每页大小
      page, // 页码
      tab, // 选项卡
      tag // 数据标签
    }
  },
  computed: {
    totalPage () {
      return Math.ceil(this.articlesCount / this.limit)
    },
    ...mapState(['user'])
  },
  data () {
   return {}
  },
  methods:{
    async addFavorite (article) {
      article.favoriteDisabled = true;
      //取消点赞
      if(article.favorited){
        await deleteFavorite(article.slug)
        article.favorited = false
        article.favoritesCount--
      }else{//添加点赞
        await addFavorite(article.slug)
        article.favorited = true
        article.favoritesCount++
      }
      article.favoriteDisabled = false;
    }
  }
}
</script>
<style>
</style>