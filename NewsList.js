// src/NewsList.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Image, TouchableOpacity, Linking, TextInput, Button } from 'react-native';
import axios from 'axios';

const NewsList = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredArticles, setFilteredArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(`https://gnews.io/api/v4/top-headlines?token=760be8540715a4ddb7d4804a29b79eb9`);
        setArticles(response.data.articles);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredArticles(articles);
    } else {
      const filtered = articles.filter(article =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.source.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (article.author && article.author.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (article.description && article.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      setFilteredArticles(filtered);
    }
  }, [searchQuery, articles]);

  const renderArticleItem = ({ item }) => {
    const { title, description, image, publishedAt, source } = item;

    return (
      <TouchableOpacity onPress={() => Linking.openURL(item.url)} style={styles.articleContainer}>
        <Image source={{ uri: image }} style={styles.articleImage} />
        <View style={styles.articleContent}>
          <Text style={styles.articleTitle}>{title}</Text>
          <Text style={styles.articleDescription}>{description}</Text>
          <Text style={styles.articleMeta}>{source.name} - {new Date(publishedAt).toDateString()}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const handleSearch = () => {
    // Perform search based on searchQuery
    // We're updating filteredArticles state in the useEffect hook
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search articles"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <Button title="Search" onPress={handleSearch} />
      <FlatList
        data={filteredArticles}
        renderItem={renderArticleItem}
        keyExtractor={item => item.url}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  articleContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  articleImage: {
    width: 80,
    height: 80,
    marginRight: 15,
    borderRadius: 5,
  },
  articleContent: {
    flex: 1,
  },
  articleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  articleDescription: {
    fontSize: 14,
    marginBottom: 5,
  },
  articleMeta: {
    fontSize: 12,
    color: '#666',
  },
});

export default NewsList;
