<template>
<div>
    <Logo />
    <Subtitle text="주문 상세"/>
    <h3 class="headline text-center my-3" v-if="order.state !== 'PENDING'">주문번호 {{ order.orderNumber }}</h3>

    <v-card flat class="py-3">
        <OrderItemListItem v-for="(item) in order.orderItems"
            v-bind:key="item.id" :orderItem="item"/>
    </v-card>
    <v-row class="justify-space-around px-5 mx-5" v-if="isOrderPending()">
        <v-btn elevation="0" color="error" @click="onRejectClick">거절하기</v-btn>
        <v-btn elevation="0" color="primary" @click="onAcceptClick">주문 접수</v-btn>
    </v-row>
    <v-row class="justify-center px-5 mx-5" v-if="isOrderInProgress()">
        <v-btn elevation="0" color="primary" @click="onFinishClick">주문 완료</v-btn>
    </v-row>
    <v-dialog v-model="showAcceptDialog">
        <v-card>
            <v-card-title>주문 접수</v-card-title>
            <v-card-text>얼마나 걸리나요?</v-card-text>
            <v-btn-toggle mandatory class="d-block text-center mt-2 mb-5">
                <v-btn value="left">5분 이내</v-btn>
                <v-btn>10분</v-btn>
                <v-btn>20분</v-btn>
            </v-btn-toggle>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text @click="onAcceptDialogResolve">접수</v-btn>
                <v-btn text @click="showAcceptDialog = false">닫기</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <v-dialog v-model="showRejectDialog">
        <v-card>
            <v-card-title>주문 접수</v-card-title>
            <v-card-text>거절 사유를 선택해주세요.</v-card-text>
            <v-radio-group
                class="mx-5"
                v-model="rejectReasonSelected"
                @change="onRejectReasonChange">
                <v-radio
                    label="주문이 너무 많아요."></v-radio>
                <v-radio
                    label="재료가 소진됐어요."></v-radio>
                <v-radio
                    label="직접 입력"></v-radio>
            </v-radio-group>
            <v-textarea
                    outlined
                    label="거절 사유를 입력해주세요"
                    class="mx-5"
                    v-if="showRejectReasonInput"/>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text @click="onRejectDialogResolve">접수</v-btn>
                <v-btn text @click="showRejectDialog = false">닫기</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
        <v-dialog v-model="showFinishDialog">
        <v-card>
            <v-card-title>주문 완료</v-card-title>
            <v-card-text>주문을 완료 처리합니다.</v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text @click="onFinishDialogResolve">확인</v-btn>
                <v-btn text @click="showFinishDialog = false">닫기</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import Logo from '@/components/Logo.vue'
import Subtitle from '@/components/Subtitle.vue'
import OrderItemListItem from '@/components/OrderItemListItem.vue'

import { OrderApiFactory } from '../lib/OrderApi'
import OrderResponse from '../lib/OrderResponse'
import Order from '../model/Order'
import OrderItem from '../model/OrderItem'
import { Prop } from 'vue-property-decorator'

@Component({
    components: {
        Logo,
        Subtitle,
        OrderItemListItem
    }
})
export default class OrderDetail extends Vue {
    private isPending!: boolean
    private order: Order = new Order(0, 'PENDING', 0, []);
    private showAcceptDialog = false;
    private showRejectDialog = false;
    private showFinishDialog = false;
    private showRejectReasonInput = false;
    private rejectReasonSelected = 0;

    private beforeMount () {
        // TODO: Must be changed later
        new OrderApiFactory().create().findById(Number(this.$route.params.orderId))
        .then(order => {
            this.order = new Order(order.id, order.state, order.orderNumber, order.orderItems.map(v => new OrderItem(v.id, v.menuItemId, v.quantity)))
        })
    }

    private isOrderPending () {
        return this.order.state === 'PENDING'
    }

    private isOrderInProgress () {
        return this.order.state === 'IN_PROGRESS'
    }

    private onAcceptClick () {
        this.showAcceptDialog = true
    }

    private onAcceptDialogResolve () {
        this.showAcceptDialog = false
        this.$router.push('/?notify=orderAccepted')
    }

    private onRejectClick () {
        this.showRejectDialog = true
    }

    private onRejectDialogResolve () {
        this.showRejectDialog = false
        this.$router.push('/?notify=orderRejected')
    }

    private onRejectReasonChange () {
        this.showRejectReasonInput = this.rejectReasonSelected === 2
    }

    private onFinishClick () {
        this.showFinishDialog = true
    }

    private onFinishDialogResolve () {
        this.showFinishDialog = false
        this.$router.push('/?notify=orderFinished')
    }
}
</script>