import conf from "../conf/conf";
import { Client, Databases, ID, Storage, Query } from "appwrite";

export class Service {
  Client = new Client();
  databases;
  bucket;
  constructor() {
    this.Client.setEndpoint(conf.apprriteUrl).setProject(
      conf.apprriteProjectID
    );
    this.databases = new Databases(this.Client);
    this.bucket = new Storage(this.Client);
  }
  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        conf.apprriteDataBaseId,
        conf.apprriteCollectionId,
        slug,
        {
          title,
          status,
          content,
          featuredImage,
          userId,
        }
      );
    } catch (error) {
      console.log("appwrite serivce :: createPost :: Error", error);
    }
  }
  async UpdatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.apprriteDataBaseId,
        conf.apprriteCollectionId,
        slug,
        {
          title,
          status,
          featuredImage,
          content,
        }
      );
    } catch (error) {
      throw error;
    }
  }
  async DeletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.apprriteDataBaseId,
        conf.apprriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("appwrite serivce :: deletePost :: Error ", error);
      return false;
    }
  }
  async getPost(slug) {
    try {
      await this.databases.getDocument(
        conf.apprriteDataBaseId,
        conf.apprriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("appwrite services :: getPost :: Error", error);
      return false;
    }
  }
  async getPosts(queries = [Query.equal("stats", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.apprriteDataBaseId,
        conf.apprriteCollectionId,
        queries
      );
    } catch (error) {
      console.log("appwrite service :: getPosts :: Error", error);
      return false;
    }
  }
  async UploadFile(file) {
    try {
      await this.bucket.createFile(conf.apprriteBucketId, ID.unique(), file);
    } catch (error) {
      console.log("appwrite service :: upload :: Error", error);
    }
  }
  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.apprriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("appwrite service :: deleteFile :: Error", error);
      return false;
    }
  }
  getFilePreview(fileId) {
    return this.bucket.getFilePreview(conf.apprriteBucketId, fileId);
  }
}

const service = new Service();
export default service;
