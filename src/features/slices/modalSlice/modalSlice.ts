import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import type { RootState } from '../../../app/store'

import type { ModalParams, ModalState } from './types'

const initialState: ModalState = {
	url: null,
	active: null
}

export const modalStateSlice = createSlice({
	name: 'modalState',
	initialState,
	reducers: {
		setActiveModal: (state, modalParams: PayloadAction<ModalParams>) => {
			state.url = modalParams.payload.url
			state.active = modalParams.payload.active
		},
		clearModal: (state) => {
			state.url = null
			state.active = null
		}
	}
})

export const { setActiveModal, clearModal } = modalStateSlice.actions

export const AutoUpdateState = (state: RootState) => state.modal

export default modalStateSlice.reducer
