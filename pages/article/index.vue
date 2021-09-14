<!--
 * @Date: 2021-09-10 16:38:04
 * @LastEditors: lyd
 * @LastEditTime: 2021-09-13 17:08:54
 * @Description: 无
-->
<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{ article.title }}</h1>
        <article-meta :article="article" />
      </div>
    </div>

    <div class="container page">
      <div class="row article-content">
        <div class="col-md-12" v-html ="article.body"></div>
      </div>

      <hr />

      <div class="article-actions">
         <article-meta :article="article" />
      </div>

      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <article-comments :article="article" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getArticlesDetil } from '@/api/article'
import MarkdownIt from 'markdown-it'
import ArticleMeta from './components/article-meta'
import ArticleComments from './components/article-comments'
export default {
  name: "EditorIndex",
  async asyncData({ params }) {
    const { data } = await getArticlesDetil(params.slug)
    const { article } = data
    const md = new MarkdownIt()
    article.body = md.render(article.body)
    return {
      article
    }
  },
  components: {
    ArticleMeta,
    ArticleComments
  },
  data() {
    return {};
  },
  head () {
    return {
      title: `${this.article.title} - RealWorld`,
      meta: [
        { hid: 'description', name: 'description', content: this.article.description }
      ]
    }
  },
  methods: {},
};
</script>
<style lang="css" scoped>
</style>