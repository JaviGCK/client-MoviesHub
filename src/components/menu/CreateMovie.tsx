import React, { useState } from 'react';
import { MovieForm } from '../forms/MovieForm';
import { CreateMovieProps } from '../actions/actionTypes';

export const CreateMovie: React.FC<CreateMovieProps> = ({ userId, onCreateSuccess }) => {
  const [success, setSuccess] = useState(false);

  const handleCreateSuccess = () => {
    setSuccess(true);
    onCreateSuccess();
  };

  return (
    <div>
      {success ? (
        <p>Movie created successfully!</p>
      ) : (
        <MovieForm userId={userId} onUpdate={handleCreateSuccess} />
      )}
    </div>
  );
};
