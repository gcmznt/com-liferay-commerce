<%--
/**
 * Copyright (c) 2000-present Liferay, Inc. All rights reserved.
 *
 * This library is free software; you can redistribute it and/or modify it under
 * the terms of the GNU Lesser General Public License as published by the Free
 * Software Foundation; either version 2.1 of the License, or (at your option)
 * any later version.
 *
 * This library is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU Lesser General Public License for more
 * details.
 */
--%>

<%@ include file="/init.jsp" %>

<%
CommerceWishListDisplayContext commerceWishListDisplayContext = (CommerceWishListDisplayContext)request.getAttribute(WebKeys.PORTLET_DISPLAY_CONTEXT);

CommerceWishList commerceWishList = commerceWishListDisplayContext.getCommerceWishList();
long commerceWishListId = commerceWishListDisplayContext.getCommerceWishListId();
SearchContainer<CommerceWishListItem> commerceWishListItemsSearchContainer = commerceWishListDisplayContext.getCommerceWishListItemsSearchContainer();
PortletURL portletURL = commerceWishListDisplayContext.getPortletURL();

if (portletName.equals(CommerceWishListPortletKeys.COMMERCE_WISH_LIST)) {
	portletDisplay.setShowBackIcon(true);
	portletDisplay.setURLBack(redirect);
}
%>

<c:choose>
	<c:when test="<%= commerceWishList == null %>">
		<div class="alert alert-info mx-auto">
			<liferay-ui:message key="please-select-a-valid-wish-list" />
		</div>
	</c:when>
	<c:otherwise>
		<c:if test="<%= portletName.equals(CommerceWishListPortletKeys.COMMERCE_WISH_LIST_CONTENT) && !commerceWishList.isGuestWishList() %>">
			<div class="container-fluid-1280">
				<h3 class="d-inline"><%= HtmlUtil.escape(commerceWishList.getName()) %></h3>

				<portlet:renderURL var="editCommerceWishListURL">
					<portlet:param name="mvcRenderCommandName" value="editCommerceWishList" />
					<portlet:param name="redirect" value="<%= currentURL %>" />
					<portlet:param name="commerceWishListId" value="<%= String.valueOf(commerceWishListId) %>" />
				</portlet:renderURL>

				<aui:button cssClass="d-inline float-right" href="<%= editCommerceWishListURL %>" value="edit" />
			</div>
		</c:if>

		<c:if test="<%= portletName.equals(CommerceWishListPortletKeys.COMMERCE_WISH_LIST) %>">
			<liferay-frontend:management-bar
				includeCheckBox="<%= true %>"
				searchContainerId="commerceWishListItems"
			>
				<liferay-frontend:management-bar-filters>
					<liferay-frontend:management-bar-sort
						orderByCol="<%= commerceWishListItemsSearchContainer.getOrderByCol() %>"
						orderByType="<%= commerceWishListItemsSearchContainer.getOrderByType() %>"
						orderColumns='<%= new String[] {"create-date"} %>'
						portletURL="<%= portletURL %>"
					/>
				</liferay-frontend:management-bar-filters>

				<liferay-frontend:management-bar-action-buttons>
					<liferay-frontend:management-bar-button
						href='<%= "javascript:" + renderResponse.getNamespace() + "deleteCommerceWishListItems();" %>'
						icon="times"
						label="delete"
					/>
				</liferay-frontend:management-bar-action-buttons>
			</liferay-frontend:management-bar>
		</c:if>

		<portlet:actionURL name="editCommerceWishListItem" var="editCommerceWishListItemActionURL" />

		<div class="container-fluid-1280">
			<aui:form action="<%= editCommerceWishListItemActionURL %>" method="post" name="fm">
				<aui:input name="<%= Constants.CMD %>" type="hidden" value="<%= Constants.DELETE %>" />
				<aui:input name="redirect" type="hidden" value="<%= currentURL %>" />
				<aui:input name="deleteCommerceWishListItemIds" type="hidden" />

				<liferay-ui:search-container
					id="commerceWishListItems"
					searchContainer="<%= commerceWishListItemsSearchContainer %>"
				>
					<liferay-ui:search-container-row
						className="com.liferay.commerce.wish.list.model.CommerceWishListItem"
						keyProperty="commerceWishListItemId"
						modelVar="commerceWishListItem"
					>

						<%
						CPDefinition cpDefinition = commerceWishListItem.getCPDefinition();
						%>

						<liferay-ui:search-container-column-image
							name="product"
							src="<%= cpDefinition.getDefaultImageThumbnailSrc(themeDisplay) %>"
						/>

						<liferay-ui:search-container-column-text
							cssClass="table-cell-content"
							name="description"
						>
							<a class="font-weight-bold" href="<%= commerceWishListDisplayContext.getCPDefinitionURL(cpDefinition.getCPDefinitionId(), themeDisplay) %>">
								<%= HtmlUtil.escape(cpDefinition.getName(themeDisplay.getLanguageId())) %>
							</a>

							<h6 class="text-default">
								<%= HtmlUtil.escape(commerceWishListDisplayContext.getCommerceWishListItemDescription(commerceWishListItem)) %>
							</h6>
						</liferay-ui:search-container-column-text>

						<liferay-ui:search-container-column-text
							name="price"
							value="<%= commerceWishListDisplayContext.getCommerceWishListItemPrice(commerceWishListItem) %>"
						/>

						<c:if test="<%= portletName.equals(CommerceWishListPortletKeys.COMMERCE_WISH_LIST_CONTENT) %>">
							<liferay-ui:search-container-column-text>
								<portlet:actionURL name="editCommerceWishListItem" var="deleteURL">
									<portlet:param name="<%= Constants.CMD %>" value="<%= Constants.DELETE %>" />
									<portlet:param name="redirect" value="<%= currentURL %>" />
									<portlet:param name="commerceWishListItemId" value="<%= String.valueOf(commerceWishListItem.getCommerceWishListItemId()) %>" />
								</portlet:actionURL>

								<liferay-ui:icon-delete
									label="<%= true %>"
									url="<%= deleteURL %>"
								/>
							</liferay-ui:search-container-column-text>
						</c:if>

						<liferay-ui:search-container-column-jsp
							colspan="<%= 2 %>"
							path="/wish_list_item_action.jsp"
						/>
					</liferay-ui:search-container-row>

					<liferay-ui:search-iterator
						markupView="lexicon"
					/>
				</liferay-ui:search-container>
			</aui:form>
		</div>

		<c:if test="<%= portletName.equals(CommerceWishListPortletKeys.COMMERCE_WISH_LIST) %>">
			<aui:script>
				function <portlet:namespace />deleteCommerceWishListItems() {
					if (confirm('<liferay-ui:message key="are-you-sure-you-want-to-delete-the-selected-items" />')) {
						var form = AUI.$(document.<portlet:namespace />fm);

						form.fm('deleteCommerceWishListItemIds').val(Liferay.Util.listCheckedExcept(form, '<portlet:namespace />allRowIds'));

						submitForm(form);
					}
				}
			</aui:script>
		</c:if>
	</c:otherwise>
</c:choose>