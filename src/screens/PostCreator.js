import { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
// Components
import {
  PageTitle,
  FormWrapper,
  Form,
  Textarea,
  FormError,
  FileInput,
  SubmitButton,
  ImagePreview,
  Header,
} from '../components';
// Hook form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { postSchema } from '../schema/postSchema';
// Hooks
import { usePreviewImage } from '../hooks/usePreviewImage';
// Store
import { useSelector } from 'react-redux';
import { selectProfile } from '../store/features/user/userSlice';
// Services
import { db, storage, FieldValue } from '../firebase';

export const PostCreator = () => {
  // Form validation
  const { register, errors, handleSubmit, formState, reset } = useForm({
    resolver: yupResolver(postSchema),
    mode: 'onChange',
  });

  const [addPostError, setAddPostError] = useState(null);

  const [
    imagePreviewSrc,
    handlePreviewImage,
    setImagePreviewSrc,
  ] = usePreviewImage();

  const { id, name, avatar } = useSelector(selectProfile);
  const history = useHistory();

  const onSubmit = async data => {
    const { postImage, postDescription } = data;
    const image = postImage[0];

    try {
      const postId = db.collection('posts').doc().id;
      const filePath = `posts/${id}/${postId}`;
      const fileSnapshot = await storage.ref(filePath).put(image);
      const url = await fileSnapshot.ref.getDownloadURL();

      db.collection('posts')
        .doc(postId)
        .set({
          timestamp: FieldValue.serverTimestamp(),
          image: url,
          text: postDescription,
          authorId: id,
          authorName: name,
          avatar: avatar,
          id: postId,
          likes: 0,
        })
        .then(() => history.push('/'));
      setImagePreviewSrc('');
    } catch (error) {
      setAddPostError(error.message);
    }
    reset();
  };

  return (
    <PageTitle title='post creator'>
      <Header>
        <StyledHeaderContainer>
          <StyledText>Add post</StyledText>
        </StyledHeaderContainer>
      </Header>
      <FormWrapper>
        <Form onSubmit={handleSubmit(onSubmit)}>
          {addPostError && <FormError>{addPostError}</FormError>}
          <FileInput
            name='postImage'
            label={imagePreviewSrc ? 'Image selected' : 'Choose image'}
            ref={register}
            error={errors.postImage}
            onChange={handlePreviewImage}
            accept='image/*'
          />
          <ImagePreview src={imagePreviewSrc} />
          <Textarea
            name='postDescription'
            label='Description'
            ref={register}
            error={errors.postDescription}
          />
          <SubmitButton value='Create post' disabled={!formState.isValid} />
        </Form>
      </FormWrapper>
    </PageTitle>
  );
};

const StyledHeaderContainer = styled.div`
  display: grid;
  place-items: center;
  height: 100%;
`;

const StyledText = styled.p`
  margin: 0;
  color: ${({ theme: { color } }) => color.black};
  font-weight: ${({ theme: { fontWeight } }) => fontWeight.medium};
`;
