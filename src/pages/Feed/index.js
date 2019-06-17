import React, { Component } from 'react';
import api from '../../services/api';
import io from 'socket.io-client';

import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import camera from '../../assets/camera.png';
import more from '../../assets/more.png';
import send from '../../assets/send.png';
import like from '../../assets/like.png';
import comment from '../../assets/comment.png';
import SrvConf from '../../config/server';
import styles from './styles';

export default class Feed extends Component {
	static navigationOptions = ({ navigation }) => ({
		headerRight: (
			<TouchableOpacity
				style={{ margin: 20 }}
				onPress={() => navigation.navigate('New')}
			>
				<Image source={camera} />
			</TouchableOpacity>
		)
	});

	state = {
		feeds: []
	};

	async componentDidMount() {
		this.registerToSocket();
		const response = await api.get('posts');
		this.setState({ feeds: response.data });
	}

	/**
	 * Adiciona o recurso de 'escuta' do websocket para novas interações
	 * Esta feature atualiza em RealTime as informações do nosso App quando:
	 * 1 - Um novo post é criado
	 * 2 - Toda vez que uma curtida é realizada em um dos posts existentes
	 */
	registerToSocket = () => {
		const socket = io(SrvConf.getURL());

		// 1. Adiciona o novo post como primeiro item no feed.
		socket.on('post', newPost => {
			this.setState({ feeds: [newPost, ...this.state.feeds] });
		});

		// 2. Uma vez que o emit 'like' é recebido, localiza o post nos feeds e o atualiza
		socket.on('like', likedPost => {
			this.setState({
				feeds: this.state.feeds.map(post => {
					return post._id === likedPost._id ? likedPost : post;
				})
			});
		});
	};

	// adiciona +1 like ao post com o id informado
	handleLike = id => {
		api.post(`posts/${id}/like`);
	};

	render() {
		return (
			<View>
				<FlatList
					data={this.state.feeds}
					keyExtractor={post => post._id}
					renderItem={({ item }) => (
						<View style={styles.feedItem}>
							<View style={styles.feedItemHeader}>
								<View style={styles.userInfo}>
									<Text style={styles.name}>
										{item.author}
									</Text>
									<Text style={styles.place}>
										{item.place}
									</Text>
								</View>
								<Image source={more} />
							</View>
							<Image
								style={styles.feedImage}
								source={{
									uri: SrvConf.getURL('files', item.image)
								}}
							/>
							<View style={styles.feedItemFooter}>
								<View style={styles.actions}>
									<TouchableOpacity
										style={styles.actionItem}
										onPress={() => {
											this.handleLike(item._id);
										}}
									>
										<Image source={like} />
									</TouchableOpacity>
									<TouchableOpacity
										style={styles.actionItem}
										onPress={() => {}}
									>
										<Image source={comment} />
									</TouchableOpacity>
									<TouchableOpacity
										style={styles.actionItem}
										onPress={() => {}}
									>
										<Image source={send} />
									</TouchableOpacity>
								</View>
								<Text style={styles.likes}>
									{item.likes} curtidas
								</Text>
								<Text style={styles.description}>
									{item.description}
								</Text>
								<Text style={styles.hashtags}>
									{item.hashtags}
								</Text>
							</View>
						</View>
					)}
				/>
			</View>
		);
	}
}
