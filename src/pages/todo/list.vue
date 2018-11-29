<template>
    <import src="../../common/tpl/footer.tpl" />
    <view class="todo-wrap">
        <image class="page-img" src="../../common/img/okm.png" />
        <view>
            <button @click="goAddTodoPage">Goto Add(total: {{totalNum}})</button>

            <button @click="getOnlineTodoList" if="needOnline">拉取在线数据</button>
        </view>
        <radio-group class="todo-filter" @change="onFilterChange">
            <label class="filter-item" for="item in filterItems">
                <radio :value="item.value"
                    :checked="item.checked"
                    color="#ff0000" />
                {{item.name}}
            </label>
        </radio-group>
        <view class="todo-list">
            <view class="empty-tip" if="!filterList.length">无</view>
            <view @click="onToggleDone(item.id)" for="item, index in filterList"
                :class="[item.completed ? 'done' : '', 'todo-item']" else>
                <text class="todo-content">{{item.text}}</text>
                <icon size="16" class="op-btn" type="clear" @click.stop="onRemoveTodo(item.id)"/>
            </view>
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
        // 为 true 时，会拉取 server 上的数据
        // 需要：`npm run dev:server`
        needOnline: true,
        filterItems: [
            {name: '全部', value: SHOW_ALL, checked: true},
            {name: '已完成', value: SHOW_DONE},
            {name: '未完成', value: SHOW_UNDONE}
        ],
        filterType: SHOW_ALL
    },

    computed: {
        filterList() {
            let filterType = this.filterType;
            if (filterType === SHOW_ALL) {
                return this.todos;
            }

            let showDone = filterType === SHOW_DONE;
            return this.todos.filter(item => {
                let completed = item.completed;
                return showDone ? completed : !completed;
            });
        }
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
                'getTodoList': 'getTodoList',
                'toggle': 'toggleTodo',
                'removeTodo': 'removeTodo',
                'addTodo': 'addTodo'
            }
        ]
    },

    created() {
        let state = this.$store.getState();
        console.log(state);
    },

    methods: {
        onToggleDone(id) {
            this.toggle(id);
        },

        onRemoveTodo(id) {
            this.removeTodo(id);
        },

        onFilterChange(e) {
            let filterType = e.detail.value;
            this.filterType = +filterType;
        },

        getOnlineTodoList() {
            this.getTodoList();
        },

        goAddTodoPage() {
            this.$api.navigateTo({
                url: '/pages/todo/add'
            });
        }
    }
};
</script>
<style lang="stylus">
.todo-wrap
    min-height: 100vh
    padding: 20px
    box-sizing: border-box
    background: #ccc

    .todo-filter
        margin-bottom: 20px
        display: flex

        .filter-item
            flex: 1

        .filter-text
            text-align: right

    .add-todo-btn
        margin: 10px 0

    .todo-list
        padding: 20px 0
        background: #fff

    .todo-item
        display: flex
        padding: 20px
        margin: 20px
        border: 1px solid #ccc
        /* px2rpx: no */
        color: #7676ea

        &.done
            color: #ccc

        .op-btn
            vertical-align: middle

    .todo-content
        flex: 1

    .empty-tip
        padding: 10px
        color: #ccc

</style>
