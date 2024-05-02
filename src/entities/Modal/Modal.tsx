import { Icon56LinkCircleOutline } from '@vkontakte/icons'
import { Button, ModalCard, ModalRoot, Spacing } from '@vkontakte/vkui'

import {
	useAppDispatch,
	useAppSelector
} from '../../features/hooks/redux/reduxTypes'

import { clearModal } from '../../features/slices/modalSlice/modalSlice'

export const Modal = () => {
	const modalState = useAppSelector((state) => state.modal)
	const dispatch = useAppDispatch()

	return (
		<ModalRoot activeModal={modalState.active}>
			<ModalCard
				id="id"
				onClose={() => dispatch(clearModal())}
				icon={<Icon56LinkCircleOutline />}
				header="Переход по внешней ссылке"
				subheader={modalState.url}
				actions={
					<>
						<Spacing size={16} />
						<Button
							size="l"
							mode="primary"
							stretched
							onClick={() => {
								if (typeof modalState.url === 'string') {
									window.open(
										`https://vk.com/away.php?to=${encodeURIComponent(modalState.url)}`,
										'_blank'
									)
								}
							}}
							disabled={typeof modalState.url !== 'string'}
						>
							Перейти
						</Button>
					</>
				}
			/>
		</ModalRoot>
	)
}
