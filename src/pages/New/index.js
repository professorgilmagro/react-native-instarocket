import React, { Component } from 'react';

import {
	View,
	Text,
	TouchableOpacity,
	TextInput,
	Image,
	Alert
} from 'react-native';

import ImagePicker from 'react-native-image-picker';
import { LineDotsLoader } from 'react-native-indicator';

import styles from './styles';
import noimage from '../../assets/noimage.png';
import path from 'path-parse';
import api from '../../services/api';

export default class New extends Component {
	static navigationOptions = {
		headerTitle: 'Nova publicação'
	};

	state = {
		preview: null,
		image: null,
		author: '',
		name: '',
		place: '',
		description: '',
		hashtags: '',
		loading: false
	};

	handleSelectImage = () => {
		ImagePicker.showImagePicker(
			{
				title: 'Selecionar imagem'
			},
			upload => {
				if (upload.error) {
					Alert.alert('Error', upload.error);
					return;
				}

				if (upload.didCancel) {
					Alert.alert('Cancelled', 'Ação cancelada');
					return;
				}

				this.setState({
					preview: {
						uri: `data:${upload.type};base64,${upload.data}`
					},
					image: {
						uri: upload.uri,
						type: upload.type,
						name: this.getNewFileName(upload.fileName)
					}
				});
			}
		);
	};

	getNewFileName(originalName = null) {
		if (originalName) {
			return `${path(originalName).name}.jpg`;
		}

		return `${new Date().getTime()}.jpg`;
	}

	handleSubmit = async () => {
		const data = new FormData();

		this.setState({ loading: true });
		data.append('image', this.state.image);
		data.append('author', this.state.author);
		data.append('place', this.state.place);
		data.append('description', this.state.description);
		data.append('hashtags', this.state.hashtags);

		await api.post('posts', data);
		this.setState({ loading: false });

		this.props.navigation.navigate('Feed');
	};

	render() {
		let imageSource = noimage;
		let imageMode = 'contain';

		if (this.state.preview) {
			imageSource = this.state.preview;
			imageMode = 'cover';
		}

		return (
			<View style={styles.container}>
				<LineDotsLoader
					color='#7159c1'
					dotsNumber={6}
					size={this.state.loading ? 10 : 0}
				/>
				<TouchableOpacity
					style={styles.previewArea}
					onPress={this.handleSelectImage}
				>
					<Image
						source={imageSource}
						style={styles.preview}
						resizeMode={imageMode}
					/>
				</TouchableOpacity>

				<TextInput
					style={styles.input}
					autoCorrect={false}
					autoCapitalize='none'
					placeholder='Nome do autor'
					placeholderTextColor='#999'
					value={this.state.author}
					onChangeText={author => this.setState({ author })}
				/>

				<TextInput
					style={styles.input}
					autoCorrect={false}
					autoCapitalize='none'
					placeholder='Local da foto'
					placeholderTextColor='#999'
					value={this.state.place}
					onChangeText={place => this.setState({ place })}
				/>

				<TextInput
					style={styles.input}
					autoCorrect={false}
					autoCapitalize='none'
					placeholder='Descrição'
					placeholderTextColor='#999'
					value={this.state.description}
					onChangeText={description => this.setState({ description })}
				/>

				<TextInput
					style={styles.input}
					autoCorrect={false}
					autoCapitalize='none'
					placeholder='Hashtags'
					placeholderTextColor='#999'
					value={this.state.hashtags}
					onChangeText={hashtags => this.setState({ hashtags })}
				/>

				<TouchableOpacity
					style={styles.shareButton}
					onPress={this.handleSubmit}
				>
					<Text style={styles.shareButtonText}>Compartilhar</Text>
				</TouchableOpacity>
			</View>
		);
	}
}
