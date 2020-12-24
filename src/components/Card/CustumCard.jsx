import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Button, Card, Image } from 'semantic-ui-react'
import { toast } from "react-toastify";
const CustumCard = ({ imgSrc, description, title, articleId }) => {
  const history = useHistory();
  const handleDeletedArticle = (article_id) => {
    axios.delete(`${process.env.REACT_APP_API_ENDPONIT}/articles/${article_id}`)
      .then(response => {
        toast.warn('Deleted!', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTimeout(() => history.push('/'), 2000)

      })
      .catch(err => console.error(err))
  }
  return (
    <Card>
      <Image src={imgSrc} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{title}</Card.Header>
        <Card.Description>
          {description}.
      </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button icon="trash" color="red" onClick={() => { handleDeletedArticle(articleId) }} />
      </Card.Content>
    </Card>
  )
}

export default CustumCard
