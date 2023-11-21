import { IconButton, TextField } from "@mui/material"
import ClearIcon from '@mui/icons-material/Clear';

interface SearchFormProps {
    onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  }

function SearchForm ({onSubmit, onChange}: SearchFormProps) {
    return(
        <form onSubmit={onSubmit} className='recipe-page-form'>
        <TextField
          onChange={onChange}
          type='input'
          label='Search recipe'
          variant='standard'
          size='medium'
          color='success'
        />
        <IconButton>
          <ClearIcon color='success' />
        </IconButton>
      </form>
    )
}



  export default SearchForm