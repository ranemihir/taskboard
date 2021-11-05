import Header from '@editorjs/header';
import List from '@editorjs/list';
import Marker from '@editorjs/marker';

export default {
    holder: 'editorjs',
    tools: {
        list: {
            class: List,
            inlineToolbar: [
                'link', 'bold'
            ]
        },
        header: {
            class: Header,
            inlineToolbar: [
                'link',
                'bold',
                'italic'
            ]
        },
        marker: {
            class: Marker,
            shortcut: 'CMD+SHIFT+M'
        }
    }
};

