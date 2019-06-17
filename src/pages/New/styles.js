import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 20,
		paddingTop: 30
	},

	selectButton: {
		borderRadius: 4,
		borderWidth: 1,
		borderColor: '#CCC',
		borderStyle: 'dashed',
		height: 42,

		justifyContent: 'center',
		alignItems: 'center'
	},

	selectButtonText: {
		fontSize: 16,
		color: '#666'
	},

	previewArea: {
		borderWidth: 1,
		borderColor: '#ccc',
		borderStyle: 'dashed',
		width: '100%',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 20
	},

	preview: {
		width: '100%',
		minHeight: '30%',
		height: 'auto',
		alignSelf: 'center'
	},

	input: {
		borderRadius: 4,
		borderWidth: 1,
		borderColor: '#ddd',
		padding: 15,
		marginTop: 10,
		fontSize: 16
	},

	shareButton: {
		backgroundColor: '#7159c1',
		borderRadius: 4,
		height: 42,
		marginTop: 15,

		justifyContent: 'center',
		alignItems: 'center'
	},

	shareButtonText: {
		fontWeight: 'bold',
		fontSize: 16,
		color: '#FFF'
	}
});
