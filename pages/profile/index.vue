<!--
 * @Date: 2021-09-10 16:36:11
 * @LastEditors: lyd
 * @LastEditTime: 2021-09-14 15:12:28
 * @Description:  个人主页
-->
<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="profile.image" class="user-img" />
            <h4>{{ profile.username }}</h4>
            <p>
              {{ profile.bio }}
            </p>
            <template v-if="user && user.username !== profile.username">
              <button
                class="btn btn-sm btn-outline-secondary action-btn"
                :disabled="profile.followDisabled"
                @click="onFollow(profiles)"
              >
                <i
                  :class="`ion-${profile.following ? 'minus' : 'plus'}-round`"
                ></i>
                &nbsp; {{ profile.following ? "unFollow" : "follow" }}
                {{ profile.username }}
              </button>
            </template>
            <template v-else>
              <button
                class="btn btn-sm btn-outline-secondary action-btn"
                :disabled="profile.followDisabled"
                @click="goEditProfile(profiles)"
              >
                <i class="ion-gear-a"></i>
                &nbsp; Edit Profile Settings
              </button>
            </template>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{ active: tab === 'My_Articles' }"
                  exact
                  :to="{
                    name: 'profile',
                    query: {
                      tab: 'My_Articles',
                    },
                  }"
                ></nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{ active: tab === 'Favorited_Articles' }"
                  exact
                  :to="{
                    name: 'profile',
                    query: {
                      tab: 'Favorited_Articles',
                    },
                  }"
                ></nuxt-link>
              </li>
            </ul>
          </div>
          <div
            class="article-preview"
            v-for="article in articles"
            :key="article.sulg"
          >
            <div class="article-meta">
              <nuxt-link
                :to="{
                  name: 'profile',
                  params: {
                    username: article.author.username,
                  },
                }"
              >
                <img :src="article.author.image" />
              </nuxt-link>
              <div class="info">
                <nuxt-link
                  class="author"
                  :to="{
                    name: 'profile',
                    params: {
                      username: article.author.username,
                    },
                  }"
                >
                  {{ article.author.username }}
                </nuxt-link>
                <span class="date">{{
                  article.createdAt | date("MMM DD, YYYY")
                }}</span>
              </div>
              <button
                class="btn btn-outline-primary btn-sm pull-xs-right"
                :class="{ active: article.favorited }"
                @click="addFavorite(article)"
                :disabled="article.favoriteDisabled"
              >
                <i class="ion-heart"></i> {{ article.favoritesCount }}
              </button>
            </div>
            <nuxt-link
              :to="{
                name: 'article',
                params: {
                  slug: article.slug,
                },
              }"
              class="preview-link"
            >
              <h1>{{ article.title }}</h1>
              <p>{{ article.description }}</p>
              <span>Read more...</span>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getProfile, follow, unfollow } from "@/api/profile";
import { mapState } from "vuex";
export default {
  middleware: "authenticated",
  name: "UserProfile",
  async asyncData({ param }) {
    const { data } = await getProfile(param.username);
    const { profile } = data;
    profile.followDisabled = false;

    const tab = query.tab || "My_Articles";
    const articleParams =
      tab == "My_Articles"
        ? { author: profile.username }
        : { favorited: profile.username };
    const articleData = await getArticles(articleParams);
    const articles = articleData.data.articles;
    return {
      profile,
      articles,
      tab,
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  data() {
    return {};
  },
  methods: {
    // 关注，取消关注
    async onFollow(profile) {
      this.profile.followDisabled = true;
      if (profile.following) {
        const { data } = await unfollow(profile.username);
        this.profile = data.profile;
        this.profile.followDisabled = false;
      } else {
        const { data } = await follow(profile.username);
        this.profile = data.profile;
        this.profile.followDisabled = true;
      }
      this.profile.followDisabled = false;
    },
    // 跳转个人信息编辑页
    goEditProfile() {
      this.$router.push({
        name: "settings",
      });
    },
  },
};
</script>
<style lang="css" scoped>
</style>