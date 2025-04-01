import { TComment } from '../../const'
import style from './comment-item.module.css'

type TCommentProps = {
	comment: Partial<TComment>
}

export function CommentItem({ comment }: TCommentProps) {
	return (
		<div className={style.comment}>
			<p className={style.commentText}>{comment.body}</p>
			<p className={style.commentEmail}>✉ {comment.email}</p>
		</div>
	)
}
