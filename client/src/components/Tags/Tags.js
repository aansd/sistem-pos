import React, { useContext, useState } from 'react';
import Badge from 'react-bootstrap/Badge';
import Stack from 'react-bootstrap/Stack';
import { StoreContext } from '../../Context/StoreContext';

const Tags = ({ onTagClick }) => {
    const { tag } = useContext(StoreContext);
    const [activeTags, setActiveTags] = useState([]); 

    const handleTagClick = (tagItem) => {
        // Cek jika tag sudah aktif
        if (activeTags.some(activeTag => activeTag._id === tagItem._id)) {
            // Hapus tag dari daftar activeTags
            const updatedTags = activeTags.filter(activeTag => activeTag._id !== tagItem._id);
            setActiveTags(updatedTags);
            onTagClick(updatedTags); 
        } else {
            // Tambahkan tag ke daftar activeTags
            const updatedTags = [...activeTags, tagItem];
            setActiveTags(updatedTags);
            onTagClick(updatedTags); 
        }
    };

    return (
        <div>
            <Stack direction="horizontal" gap={2}>
                {tag.map((tagItem) => (
                    <Badge
                        key={tagItem._id}
                        bg={activeTags.some(activeTag => activeTag._id === tagItem._id) ? 'primary' : 'light'} 
                        text={activeTags.some(activeTag => activeTag._id === tagItem._id) ? 'white' : 'dark'} 
                        style={{ cursor: 'pointer' }} 
                        onClick={() => handleTagClick(tagItem)} // Tambahkan onClick di sini
                    >
                        {tagItem.name}
                    </Badge>
                ))}
            </Stack>
        </div>
    );
};

export default Tags;
