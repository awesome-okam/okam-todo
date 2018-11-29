<template>
    <import src="../../common/tpl/footer.tpl" />
    <view class="todo-add">
        <input
            class="todo-input"
            type="text"
            ref="input"
            :focus="focus"
            placeholder="输入 Todo 项内容"
            @input="onInput"/>
        <view>
            <button @click="goTodoPage">add Todo (total: {{totalNum}})</button>
        </view>
    </view>
    <tpl is="page-footer" />
</template>

<script>
import todoActions from '../../actions/index';

const SHOW_ALL = 1;
const SHOW_DONE = 2;
const SHOW_UNDONE = 3;

export default {
    config: {
        navigationBarTitleText: 'Todos',
        backgroundColor: '#fff'
    },

    data: {
        inputValue: '',
        focus: true
    },

    $store: {
        computed: {
            todos: 'todos',
            totalNum(state) {
                return state.todos.length;
            }
        },
        actions: [
            todoActions,
            {
                'addTodo': 'addTodo'
            }
        ]
    },

    created() {
        let state = this.$store.getState();
        console.log(state);
    },

    methods: {
        onInput(e) {
            let value = e.detail.value.trim();
            this.inputValue = value;
        },

        goTodoPage() {
            if (!this.inputValue) {
                this.focus = true;
                return;
            }
            this.addTodo(this.inputValue);
            this.$api.navigateTo({
                url: '/pages/todo/list'
            });
        }
    }
};
</script>
<style lang="stylus">
.todo-add
    min-height: 100vh
    padding: 20px
    box-sizing: border-box
    background: #ccc

    .add-todo-btn
        margin: 10px 0

    .todo-input
        box-sizing: border-box
        padding: 20px
        margin: 10px
        width: 100%
        height: 160px
        line-height: 160px
        border: 1px solid #ccc
        /* px2rpx: no */
        box-shadow: 1px 3px 8px 1px #a8a8f3
        /* px2rpx: no */
        background: #fff
</style>
